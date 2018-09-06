#ifndef __PXT_H
#define __PXT_H

//#define DEBUG_MEMLEAKS 1

#pragma GCC diagnostic ignored "-Wunused-parameter"

#include "MicroBit.h"
#include "MicroBitImage.h"
#include "ManagedString.h"
#include "ManagedType.h"
#include "ManagedBuffer.h"

#define printf(...) uBit.serial.printf(__VA_ARGS__)
// #define printf(...)

#define intcheck(...) check(__VA_ARGS__)
//#define intcheck(...) do {} while (0)

#include <stdio.h>
#include <string.h>
#include <vector>
#include <stdint.h>

#ifdef DEBUG_MEMLEAKS
#include <set>
#endif

extern MicroBit uBit;

namespace pxt {
  typedef uint32_t Action;
  typedef uint32_t ImageLiteral;


  typedef enum {
    ERR_INVALID_BINARY_HEADER = 5,
    ERR_OUT_OF_BOUNDS = 8,
    ERR_REF_DELETED = 7,
    ERR_SIZE = 9,
  } ERROR;

  extern const uint32_t functionsAndBytecode[];
  extern uint32_t *globals;
  extern uint16_t *bytecode;
  class RefRecord;

  // Utility functions
  extern MicroBitEvent lastEvent;
  void registerWithDal(int id, int event, Action a);
  void runInBackground(Action a);
  uint32_t runAction3(Action a, int arg0, int arg1, int arg2);
  uint32_t runAction2(Action a, int arg0, int arg1);
  uint32_t runAction1(Action a, int arg0);
  uint32_t runAction0(Action a);
  Action mkAction(int reflen, int totallen, int startptr);
  void error(ERROR code, int subcode = 0);
  void exec_binary(uint16_t *pc);
  void start();
  void debugMemLeaks();
  // allocate [sz] words and clear them
  uint32_t *allocate(uint16_t sz);
  int templateHash();
  int programHash();
  uint32_t programSize();
  uint32_t afterProgramPage();     
  int getNumGlobals();
  RefRecord* mkClassInstance(int vtableOffset);

  // The standard calling convention is:
  //   - when a pointer is loaded from a local/global/field etc, and incr()ed
  //     (in other words, its presence on stack counts as a reference)
  //   - after a function call, all pointers are popped off the stack and decr()ed
  // This does not apply to the RefRecord and st/ld(ref) methods - they unref()
  // the RefRecord* this.
  int incr(uint32_t e);
  void decr(uint32_t e);

  inline void *ptrOfLiteral(int offset)
  {
    return &bytecode[offset];
  }

  inline ImageData* imageBytes(int offset)
  {
    return (ImageData*)(void*)&bytecode[offset];
  }

  // Checks if object has a VTable, or if its RefCounted* from the runtime.
  inline bool hasVTable(uint32_t e)
  {
    return (*((uint32_t*)e) & 1) == 0;
  }

  inline void check(int cond, ERROR code, int subcode = 0)
  {
    if (!cond) error(code, subcode);
  }


  class RefObject;
#ifdef DEBUG_MEMLEAKS
  extern std::set<RefObject*> allptrs;
#endif

  typedef void (*RefObjectMethod)(RefObject *self);
  typedef void *PVoid;
  typedef void **PPVoid;

  const PPVoid RefMapMarker = (PPVoid)(void*)43;

  struct VTable {
    uint16_t numbytes;  // in the entire object, including the vtable pointer
    uint16_t userdata;
    PVoid *ifaceTable;
    PVoid methods[2]; // we only use up to two methods here; pxt will generate more
    // refmask sits at &methods[nummethods]
  };

  const int vtableShift = 2;

  // A base abstract class for ref-counted objects.
  class RefObject
  {
  public:
    uint16_t refcnt;
    uint16_t vtable;

    RefObject(uint16_t vt)
    {
      refcnt = 2;
      vtable = vt;
#ifdef DEBUG_MEMLEAKS
      allptrs.insert(this);
#endif
    }

    inline VTable *getVTable() {
      return (VTable*)(vtable << vtableShift);
    }

    void destroy();
    void print();

    // Call to disable pointer tracking on the current instance (in destructor or some other hack)
    inline void untrack() {
#ifdef DEBUG_MEMLEAKS
      allptrs.erase(this);
#endif
    }

    // Increment/decrement the ref-count. Decrementing to zero deletes the current object.
    inline void ref()
    {
      check(refcnt > 0, ERR_REF_DELETED);
      //printf("INCR "); this->print();
      refcnt += 2;
    }

    inline void unref()
    {
      //printf("DECR "); this->print();
      check(refcnt > 0, ERR_REF_DELETED);
      refcnt -= 2;
      if (refcnt == 0) {
        destroy();
      }
    }
  };

  class Segment {
  private:    
      uint32_t* data;
      uint16_t length;
      uint16_t size;

      static const uint16_t MaxSize = 0xFFFF;
      static const uint32_t DefaultValue = 0x0;

      static uint16_t growthFactor(uint16_t size);      
      void growByMin(uint16_t minSize);
      void growBy(uint16_t newSize);
      void ensure(uint16_t newSize);

  public:
      Segment() : data (nullptr), length(0), size(0) {};

      uint32_t get(uint32_t i);
      void set(uint32_t i, uint32_t value);      

      uint32_t getLength() { return length;};
      void setLength(uint32_t newLength);

      void push(uint32_t value);
      uint32_t pop();

      uint32_t remove(uint32_t i);
      void insert(uint32_t i, uint32_t value);

      bool isValidIndex(uint32_t i);

      void destroy();

      void print();
  };

  // A ref-counted collection of either primitive or ref-counted objects (String, Image,
  // user-defined record, another collection)
  class RefCollection
    : public RefObject
  {
  private:
    Segment head;
  public:
    // 1 - collection of refs (need decr)
    // 2 - collection of strings (in fact we always have 3, never 2 alone)
    inline uint32_t getFlags() { return getVTable()->userdata; }
    inline bool isRef() { return getFlags() & 1; }
    inline bool isString() { return getFlags() & 2; }

    RefCollection(uint16_t f);

    void destroy();
    void print();

    uint32_t length() { return head.getLength();}
    void setLength(uint32_t newLength) { head.setLength(newLength); }

    void push(uint32_t x);
    uint32_t pop();
    uint32_t getAt(int i);
    void setAt(int i, uint32_t x);
    //removes the element at index i and shifts the other elements left
    uint32_t removeAt(int i);
    //inserts the element at index i and moves the other elements right.
    void insertAt(int i, uint32_t x); 

    int indexOf(uint32_t x, int start);
    int removeElement(uint32_t x);
  };

  struct MapEntry {
    uint32_t key;
    uint32_t val;
  };

  class RefMap
    : public RefObject
  {
  public:
    std::vector<MapEntry> data;

    RefMap();
    void destroy();
    void print();
    int findIdx(uint32_t key);
  };

  // A ref-counted, user-defined JS object.
  class RefRecord
    : public RefObject
  {
  public:
    // The object is allocated, so that there is space at the end for the fields.
    uint32_t fields[];

    RefRecord(uint16_t v) : RefObject(v) {}

    uint32_t ld(int idx);
    uint32_t ldref(int idx);
    void st(int idx, uint32_t v);
    void stref(int idx, uint32_t v);
  };

  // these are needed when constructing vtables for user-defined classes
  void RefRecord_destroy(RefRecord *r);
  void RefRecord_print(RefRecord *r);

  class RefAction;
  typedef uint32_t (*ActionCB)(uint32_t *captured, uint32_t arg0, uint32_t arg1, uint32_t arg2);

  // Ref-counted function pointer. It's currently always a ()=>void procedure pointer.
  class RefAction
    : public RefObject
  {
  public:
    // This is the same as for RefRecord.
    uint8_t len;
    uint8_t reflen;
    ActionCB func; // The function pointer
    // fields[] contain captured locals
    uint32_t fields[];

    void destroy();
    void print();

    RefAction();

    inline void stCore(int idx, uint32_t v)
    {
      //printf("ST [%d] = %d ", idx, v); this->print();
      intcheck(0 <= idx && idx < len, ERR_OUT_OF_BOUNDS, 10);
      intcheck(fields[idx] == 0, ERR_OUT_OF_BOUNDS, 11); // only one assignment permitted
      fields[idx] = v;
    }

    inline uint32_t runCore(int arg0, int arg1, int arg2) // internal; use runAction*() functions
    {
      this->ref();
      uint32_t r = this->func(&this->fields[0], arg0, arg1, arg2);
      this->unref();
      return r;
    }
  };

  // These two are used to represent locals written from inside inline functions
  class RefLocal
    : public RefObject
  {
  public:
    uint32_t v;
    void destroy();
    void print();
    RefLocal();
  };

  class RefRefLocal
    : public RefObject
  {
  public:
    uint32_t v;
    void destroy();
    void print();
    RefRefLocal();
  };
}

using namespace pxt;
MicroBitPin *getPin(int id);
typedef ImageData* Image;
typedef BufferData* Buffer;

// The ARM Thumb generator in the JavaScript code is parsing
// the hex file and looks for the magic numbers as present here.
//
// Then it fetches function pointer addresses from there.
  
#define PXT_SHIMS_BEGIN \
namespace pxt { \
  const uint32_t functionsAndBytecode[] __attribute__((aligned(0x20))) = { \
    0x08010801, 0x42424242, 0x08010801, 0x8de9d83e,

#define PXT_SHIMS_END }; }

#pragma GCC diagnostic ignored "-Wpmf-conversions"

#define PXT_VTABLE_TO_INT(vt)  ((uint32_t)(vt) >> vtableShift)
#define PXT_VTABLE_BEGIN(classname, flags, iface) \
const VTable classname ## _vtable \
  __attribute__((aligned(1 << vtableShift))) \
  = { \
  sizeof(classname), \
  flags, \
  iface, \
  { \
    (void*)&classname::destroy, \
    (void*)&classname::print,

#define PXT_VTABLE_END } };

#define PXT_VTABLE_INIT(classname) \
  RefObject(PXT_VTABLE_TO_INT(&classname ## _vtable))

#define PXT_VTABLE_CTOR(classname) \
  PXT_VTABLE_BEGIN(classname, 0, 0) PXT_VTABLE_END \
  classname::classname() : PXT_VTABLE_INIT(classname)

#endif

// vim: ts=2 sw=2 expandtab
