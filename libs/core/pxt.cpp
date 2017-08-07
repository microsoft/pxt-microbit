#include "pxt.h"
#include <map>

MicroBit uBit;

namespace pxt {
    int incr(uint32_t e)
    {
      if (e) {
        if (hasVTable(e))
          ((RefObject*)e)->ref();
        else
          ((RefCounted*)e)->incr();
      }
      return e;
    }

    void decr(uint32_t e)
    {
      if (e) {
        if (hasVTable(e))
          ((RefObject*)e)->unref();
        else
          ((RefCounted*)e)->decr();
      }
    }

    Action mkAction(int reflen, int totallen, int startptr)
    {
      check(0 <= reflen && reflen <= totallen, ERR_SIZE, 1);
      check(reflen <= totallen && totallen <= 255, ERR_SIZE, 2);
      check(bytecode[startptr] == 0xffff, ERR_INVALID_BINARY_HEADER, 3);
      check(bytecode[startptr + 1] == 0, ERR_INVALID_BINARY_HEADER, 4);

      uint32_t tmp = (uint32_t)&bytecode[startptr];

      if (totallen == 0) {
        return tmp; // no closure needed
      }

      void *ptr = ::operator new(sizeof(RefAction) + totallen * sizeof(uint32_t));
      RefAction *r = new (ptr) RefAction();
      r->len = totallen;
      r->reflen = reflen;
      r->func = (ActionCB)((tmp + 4) | 1);
      memset(r->fields, 0, r->len * sizeof(uint32_t));

      return (Action)r;
    }

    uint32_t runAction3(Action a, int arg0, int arg1, int arg2)
    {
      if (hasVTable(a))
        return ((RefAction*)a)->runCore(arg0, arg1, arg2);
      else {
        check(*(uint16_t*)a == 0xffff, ERR_INVALID_BINARY_HEADER, 4);
        return ((ActionCB)((a + 4) | 1))(NULL, arg0, arg1, arg2);
      }
    }

    uint32_t runAction2(Action a, int arg0, int arg1)
    {
      return runAction3(a, arg0, arg1, 0);
    }

    uint32_t runAction1(Action a, int arg0)
    {
      return runAction3(a, arg0, 0, 0);
    }

    uint32_t runAction0(Action a)
    {
      return runAction3(a, 0, 0, 0);
    }

    RefRecord* mkClassInstance(int vtableOffset)
    {
      VTable *vtable = (VTable*)&bytecode[vtableOffset];

      intcheck(vtable->methods[0] == &RefRecord_destroy, ERR_SIZE, 3);
      intcheck(vtable->methods[1] == &RefRecord_print, ERR_SIZE, 4);

      void *ptr = ::operator new(vtable->numbytes);
      RefRecord *r = new (ptr) RefRecord(PXT_VTABLE_TO_INT(vtable));
      memset(r->fields, 0, vtable->numbytes - sizeof(RefRecord));
      return r;
    }

    uint32_t RefRecord::ld(int idx)
    {
      //intcheck((reflen == 255 ? 0 : reflen) <= idx && idx < len, ERR_OUT_OF_BOUNDS, 1);
      return fields[idx];
    }

    uint32_t RefRecord::ldref(int idx)
    {
      //printf("LD %p len=%d reflen=%d idx=%d\n", this, len, reflen, idx);
      //intcheck(0 <= idx && idx < reflen, ERR_OUT_OF_BOUNDS, 2);
      uint32_t tmp = fields[idx];
      incr(tmp);
      return tmp;
    }

    void RefRecord::st(int idx, uint32_t v)
    {
      //intcheck((reflen == 255 ? 0 : reflen) <= idx && idx < len, ERR_OUT_OF_BOUNDS, 3);
      fields[idx] = v;
    }

    void RefRecord::stref(int idx, uint32_t v)
    {
      //printf("ST %p len=%d reflen=%d idx=%d\n", this, len, reflen, idx);
      //intcheck(0 <= idx && idx < reflen, ERR_OUT_OF_BOUNDS, 4);
      decr(fields[idx]);
      fields[idx] = v;
    }

    void RefObject::destroy() {
      ((RefObjectMethod)getVTable()->methods[0])(this);
    }

    void RefObject::print() {
      ((RefObjectMethod)getVTable()->methods[1])(this);
    }

    void RefRecord_destroy(RefRecord *r) {
        auto tbl = r->getVTable();
        uint8_t *refmask = (uint8_t*)&tbl->methods[tbl->userdata & 0xff];
        int len = (tbl->numbytes >> 2) - 1;
        for (int i = 0; i < len; ++i) {
          if (refmask[i]) decr(r->fields[i]);
          r->fields[i] = 0;
        }
        //RefRecord is allocated using placement new
        r->~RefRecord();
        ::operator delete(r);
    }

    void RefRecord_print(RefRecord *r)
    {
      printf("RefRecord %p r=%d size=%d bytes\n", r, r->refcnt, r->getVTable()->numbytes);
    }

    uint32_t Segment::get(uint32_t i)
    {
#ifdef DEBUG_BUILD
      printf("In Segment::get index:%u\n", i);
      this->print();
#endif

      if (i < length)
      {
          return data[i];
      }
      return Segment::DefaultValue;
    }

    void Segment::set(uint32_t i, uint32_t value)
    {
        if (i < size)
        {
          data[i] = value;
        }
        else if (i < Segment::MaxSize)
        {
          growByMin(i + 1);
          data[i] = value;
        }
        if (length <= i)
        {
           length = i + 1;
        }

#ifdef DEBUG_BUILD
        printf("In Segment::set\n");
        this->print();
#endif

        return;
    }

    uint16_t Segment::growthFactor(uint16_t size)
    {
      if (size == 0)
      {
        return 4;
      }
      if (size < 64)
      {
        return size * 2; // Double
      }
      if (size < 512)
      {
        return size * 5/3; //Grow by 1.66 rate
      }
      return size + 256; //Grow by constant rate
    }

    void Segment::growByMin(uint16_t minSize)
    {
      growBy(max(minSize, growthFactor(size)));
    }

    void Segment::growBy(uint16_t newSize)
    {
#ifdef DEBUG_BUILD
         printf("growBy: %d\n", newSize);
         this->print();
#endif
      if (size < newSize)
      {
         //this will throw if unable to allocate
         uint32_t *tmp = (uint32_t*)(::operator new(newSize * sizeof(uint32_t)));

         //Copy existing data
         if (size)
         {
           memcpy(tmp, data, size * sizeof(uint32_t));
         }
        //fill the rest with default value
         memset(tmp + size, Segment::DefaultValue, (newSize - size) * sizeof(uint32_t));

         //free older segment;
         ::operator delete(data);

         data = tmp;
         size = newSize;

#ifdef DEBUG_BUILD
         printf("growBy - after reallocation\n");
         this->print();
#endif

      }
      //else { no shrinking yet; }
      return;
    }

    void Segment::ensure(uint16_t newSize)
    {
      if (newSize < size)
      {
        return;
      }
      growByMin(newSize);
    }

    void Segment::setLength(uint32_t newLength)
    {
      if (newLength > size)
      {
        ensure(length);
      }
      length = newLength;
      return;
    }

    void Segment::push(uint32_t value)
    {
      this->set(length, value);
    }

    uint32_t Segment::pop()
    {
#ifdef DEBUG_BUILD
      printf("In Segment::pop\n");
      this->print();
#endif

      if (length > 0)
      {
        --length;
        uint32_t value = data[length];
        data[length] = Segment::DefaultValue;
        return value;
      }
      return Segment::DefaultValue;
    }

    //this function removes an element at index i and shifts the rest of the elements to
    //left to fill the gap
    uint32_t Segment::remove(uint32_t i)
    {
#ifdef DEBUG_BUILD
      printf("In Segment::remove index:%u\n", i);
      this->print();
#endif
      if (i < length)
      {
        //value to return
        uint32_t ret = data[i];
        if (i + 1 < length)
        {
          //Move the rest of the elements to fill in the gap.
          memmove(data + i, data + i + 1, (length - i - 1) * sizeof(uint32_t));
        }
        length--;
        data[length] = Segment::DefaultValue;
#ifdef DEBUG_BUILD
        printf("After Segment::remove index:%u\n", i);
        this->print();
#endif
        return ret;
      }
      return Segment::DefaultValue;
    }

    //this function inserts element value at index i by shifting the rest of the elements right.
    void Segment::insert(uint32_t i, uint32_t value)
    {
#ifdef DEBUG_BUILD
      printf("In Segment::insert index:%u value:%u\n", i, value);
      this->print();
#endif

      if (i < length)
      {
        ensure(length + 1);
        if (i + 1 < length)
        {
          //Move the rest of the elements to fill in the gap.
          memmove(data + i + 1, data + i, (length - i) * sizeof(uint32_t));
        }

        data[i] = value;
        length++;
      }
      else
      {
        //This is insert beyond the length, just call set which will adjust the length
        set(i, value);
      }
#ifdef DEBUG_BUILD
      printf("After Segment::insert index:%u\n", i);
      this->print();
#endif
    }

    void Segment::print()
    {
      printf("Segment: %x, length: %u, size: %u\n", data, (uint32_t)length, (uint32_t)size);
      for(uint32_t i = 0; i < size; i++)
      {
        printf("%d ",(uint32_t)data[i]);
      }
      printf("\n");
    }

    bool Segment::isValidIndex(uint32_t i)
    {
      if (i > length)
      {
        return false;
      }
      return true;
    }

    void Segment::destroy()
    {
#ifdef DEBUG_BUILD
      printf("In Segment::destroy\n");
      this->print();
#endif
      length = size = 0;
      ::operator delete(data);
      data = nullptr;
    }

    void RefCollection::push(uint32_t x)
    {
      if (isRef()) incr(x);
      head.push(x);
    }

    uint32_t RefCollection::pop()
    {
      uint32_t ret = head.pop();
      if (isRef())
      {
        incr(ret);
      }
      return ret;
    }

    uint32_t RefCollection::getAt(int i)
    {
      uint32_t tmp = head.get(i);
      if (isRef())
      {
        incr(tmp);
      }
      return tmp;
    }

    uint32_t RefCollection::removeAt(int i)
    {
      if (isRef())
      {
        decr(head.get(i));
      }
      return head.remove(i);
    }

    void RefCollection::insertAt(int i, uint32_t value)
    {
      head.insert(i, value);
      if (isRef())
      {
        incr(value);
      }
    }

    void RefCollection::setAt(int i, uint32_t value)
    {
      if (isRef())
      {
        if (head.isValidIndex((uint32_t)i))
        {
          decr(head.get(i));
        }
        incr(value);
      }
      head.set(i, value);
    }

    int RefCollection::indexOf(uint32_t x, int start)
    {
      if (isString())
      {
        StringData *xx = (StringData*)x;
        uint32_t i = start;
        while(head.isValidIndex(i))
        {
          StringData *ee = (StringData*)head.get(i);
          if (ee == xx)
          {
            //handles ee being null
            return (int) i;
          }
          if (ee && xx->len == ee->len && memcmp(xx->data, ee->data, xx->len) == 0)
          {
            return (int)i;
          }
          i++;
        }
      }
      else
      {
        uint32_t i = start;
        while(head.isValidIndex(i))
        {
          if (head.get(i) == x)
          {
            return (int)i;
          }
          i++;
        }
      }

      return -1;
    }

    int RefCollection::removeElement(uint32_t x)
    {
      int idx = indexOf(x, 0);
      if (idx >= 0) {
        removeAt(idx);
        return 1;
      }
      return 0;
    }

    namespace Coll0 {
      PXT_VTABLE_BEGIN(RefCollection, 0, 0)
      PXT_VTABLE_END
    }
    namespace Coll1 {
      PXT_VTABLE_BEGIN(RefCollection, 1, 0)
      PXT_VTABLE_END
    }
    namespace Coll3 {
      PXT_VTABLE_BEGIN(RefCollection, 3, 0)
      PXT_VTABLE_END
    }

    RefCollection::RefCollection(uint16_t flags) : RefObject(0) {
      switch (flags) {
        case 0:
          vtable = PXT_VTABLE_TO_INT(&Coll0::RefCollection_vtable);
          break;
        case 1:
          vtable = PXT_VTABLE_TO_INT(&Coll1::RefCollection_vtable);
          break;
        case 3:
          vtable = PXT_VTABLE_TO_INT(&Coll3::RefCollection_vtable);
          break;
        default:
          error(ERR_SIZE);
          break;
      }
    }

    void RefCollection::destroy()
    {
      if (this->isRef())
      {
        for(uint32_t i = 0; i < this->head.getLength(); i++)
        {
          decr(this->head.get(i));
        }
      }
      this->head.destroy();
      delete this;
    }

    void RefCollection::print()
    {
      printf("RefCollection %p r=%d flags=%d size=%d\n", this, refcnt, getFlags(), head.getLength());
      head.print();
    }

    PXT_VTABLE_CTOR(RefAction) {}

    // fields[] contain captured locals
    void RefAction::destroy()
    {
      for (int i = 0; i < this->reflen; ++i) {
        decr(fields[i]);
        fields[i] = 0;
      }
      //RefAction is allocated using placement new
      this->~RefAction();
      ::operator delete(this);
    }

    void RefAction::print()
    {
      printf("RefAction %p r=%d pc=0x%lx size=%d (%d refs)\n", this, refcnt, (const uint8_t*)func - (const uint8_t*)bytecode, len, reflen);
    }

    void RefLocal::print()
    {
      printf("RefLocal %p r=%d v=%d\n", this, refcnt, v);
    }

    void RefLocal::destroy()
    {
      delete this;
    }

    PXT_VTABLE_CTOR(RefLocal) {
      v = 0;
    }

    PXT_VTABLE_CTOR(RefRefLocal) {
      v = 0;
    }

    void RefRefLocal::print()
    {
      printf("RefRefLocal %p r=%d v=%p\n", this, refcnt, (void*)v);
    }

    void RefRefLocal::destroy()
    {
      decr(v);
      delete this;
    }

    PXT_VTABLE_BEGIN(RefMap, 0, RefMapMarker)
    PXT_VTABLE_END
    RefMap::RefMap() : PXT_VTABLE_INIT(RefMap) {}

    void RefMap::destroy() {
      for (unsigned i = 0; i < data.size(); ++i) {
        if (data[i].key & 1) {
          decr(data[i].val);
        }
        data[i].val = 0;
      }
      data.resize(0);
      delete this;
    }

    int RefMap::findIdx(uint32_t key) {
      for (unsigned i = 0; i < data.size(); ++i) {
        if (data[i].key >> 1 == key)
          return i;
      }
      return -1;
    }

    void RefMap::print()
    {
      printf("RefMap %p r=%d size=%d\n", this, refcnt, data.size());
    }


#ifdef DEBUG_MEMLEAKS
  std::set<RefObject*> allptrs;
  void debugMemLeaks()
  {
    printf("LIVE POINTERS:\n");
    for(std::set<RefObject*>::iterator itr = allptrs.begin();itr!=allptrs.end();itr++)
    {
      (*itr)->print();
    }
    printf("\n");
  }
#else
  void debugMemLeaks() {}
#endif


    // ---------------------------------------------------------------------------
    // An adapter for the API expected by the run-time.
    // ---------------------------------------------------------------------------

    map<pair<int, int>, Action> handlersMap;

    MicroBitEvent lastEvent;

    // We have the invariant that if [dispatchEvent] is registered against the DAL
    // for a given event, then [handlersMap] contains a valid entry for that
    // event.
    void dispatchEvent(MicroBitEvent e) {

      lastEvent = e;

      Action curr = handlersMap[{ e.source, e.value }];
      if (curr)
        runAction1(curr, e.value);

      curr = handlersMap[{ e.source, MICROBIT_EVT_ANY }];
      if (curr)
        runAction1(curr, e.value);
    }

    void registerWithDal(int id, int event, Action a) {
      Action prev = handlersMap[{ id, event }];
      if (prev)
        decr(prev);
      else
        uBit.messageBus.listen(id, event, dispatchEvent);
      incr(a);
      handlersMap[{ id, event }] = a;
    }

    void fiberDone(void *a)
    {
      decr((Action)a);
      release_fiber();
    }


    void runInBackground(Action a) {
      if (a != 0) {
        incr(a);
        create_fiber((void(*)(void*))runAction0, (void*)a, fiberDone);
      }
    }


  void error(ERROR code, int subcode)
  {
    printf("Error: %d [%d]\n", code, subcode);
    uBit.panic(42);
  }

  uint16_t *bytecode;
  uint32_t *globals;
  int numGlobals;

  uint32_t *allocate(uint16_t sz)
  {
    uint32_t *arr = new uint32_t[sz];
    memset(arr, 0, sz * 4);
    return arr;
  }

  void checkStr(bool cond, const char *msg)
  {
    if (!cond) {
      while (true) {
        uBit.display.scroll(msg, 100);
        uBit.sleep(100);
      }
    }
  }

  int templateHash()
  {
    return ((int*)bytecode)[4];
  }

  int programHash()
  {
    return ((int*)bytecode)[6];
  }

  int getNumGlobals()
  {
    return bytecode[16];
  }

  void exec_binary(int32_t *pc)
  {
    // XXX re-enable once the calibration code is fixed and [editor/embedded.ts]
    // properly prepends a call to [internal_main].
    // ::touch_develop::internal_main();

    // unique group for radio based on source hash
    // ::touch_develop::micro_bit::radioDefaultGroup = programHash();

    // repeat error 4 times and restart as needed
    microbit_panic_timeout(4);

    int32_t ver = *pc++;
    checkStr(ver == 0x4209, ":( Bad runtime version");

    bytecode = *((uint16_t**)pc++);  // the actual bytecode is here
    globals = allocate(getNumGlobals());

    // just compare the first word
    checkStr(((uint32_t*)bytecode)[0] == 0x923B8E70 &&
             templateHash() == *pc,
             ":( Failed partial flash");

    uint32_t startptr = (uint32_t)bytecode;
    startptr += 48; // header
    startptr |= 1; // Thumb state

    ((uint32_t (*)())startptr)();

#ifdef DEBUG_MEMLEAKS
    pxt::debugMemLeaks();
#endif

    return;
  }

  void start()
  {
    exec_binary((int32_t*)functionsAndBytecode);
  }
}

// vim: ts=2 sw=2 expandtab
