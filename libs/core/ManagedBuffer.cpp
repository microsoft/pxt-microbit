#include "MicroBit.h"
#include "ManagedBuffer.h"
#include <limits.h>

static const char empty[] __attribute__ ((aligned (4))) = "\xff\xff\0\0\0";

/**
  * Internal constructor helper.
  * Configures this ManagedBuffer to refer to the static empty buffer.
  */
void ManagedBuffer::initEmpty()
{
    ptr = (BufferData*)(void*)empty;
}

/**
 * Default Constructor. 
 * Creates an empty ManagedBuffer. 
 *
 * Example:
 * @code
 * ManagedBuffer p(); 
 * @endcode
 */
ManagedBuffer::ManagedBuffer()
{
    initEmpty();
}

/**
 * Constructor. 
 * Creates an empty ManagedBuffer of the given size. 
 *
 * @param length The length of the buffer to create.
 *
 * Example:
 * @code
 * ManagedBuffer p(16);         // Creates a ManagedBuffer 16 bytes long.
 * @endcode
 */
ManagedBuffer::ManagedBuffer(int length)
{
    this->init(NULL, length);
}

/**
 * Constructor. 
 * Creates a new ManagedBuffer of the given size,
 * and fills it with the data provided.
 *
 * @param data The data with which to fill the buffer.
 * @param length The length of the buffer to create.
 * 
 * Example:
 * @code
 * uint8_t buf = {13,5,2};
 * ManagedBuffer p(buf, 3);         // Creates a ManagedBuffer 3 bytes long.
 * @endcode
 */
ManagedBuffer::ManagedBuffer(uint8_t *data, int length)
{
    this->init(data, length);
}

/**
 * Copy Constructor. 
 * Add ourselves as a reference to an existing ManagedBuffer.
 * 
 * @param buffer The ManagedBuffer to reference.
 *
 * Example:
 * @code
 * ManagedBuffer p();
 * ManagedBuffer p2(i);        // Refers to the same buffer as p. 
 * @endcode
 */
ManagedBuffer::ManagedBuffer(const ManagedBuffer &buffer)
{
    ptr = buffer.ptr;
    ptr->incr();
}

/**
  * Constructor. 
  * Create a buffer from a raw BufferData pointer. It will ptr->incr(). This is to be used by specialized runtimes.
  *
  * @param p The pointer to use.
  */    
ManagedBuffer::ManagedBuffer(BufferData *p)
{
    ptr = p;
    ptr->incr();
}

/**
 * Internal constructor-initialiser.
 *
 * @param data The data with which to fill the buffer.
 * @param length The length of the buffer to create.
 * 
 */
void ManagedBuffer::init(uint8_t *data, int length)
{
    if (length <= 0) {
        initEmpty();
        return;
    }

    ptr = (BufferData *) malloc(sizeof(BufferData) + length);
    ptr->init();

    ptr->length = length;

    // Copy in the data buffer, if provided.
    if (data)
        memcpy(ptr->payload, data, length);
    else
        memset(ptr->payload, 0, length);
}

/**
 * Destructor. 
 * Removes buffer resources held by the instance.
 */
ManagedBuffer::~ManagedBuffer()
{
    ptr->decr();
}

/**
 * Copy assign operation. 
 *
 * Called when one ManagedBuffer is assigned the value of another using the '=' operator.
 * Decrements our reference count and free up the buffer as necessary.
 * Then, update our buffer to refer to that of the supplied ManagedBuffer,
 * and increase its reference count.
 *
 * @param p The ManagedBuffer to reference.
 * 
 * Example:
 * @code
 * uint8_t buf = {13,5,2};
 * ManagedBuffer p1(16); 
 * ManagedBuffer p2(buf, 3);        
 *
 * p1 = p2;  
 * @endcode
 */
ManagedBuffer& ManagedBuffer::operator = (const ManagedBuffer &p)
{
    if(ptr == p.ptr)
        return *this;

    ptr->decr();
    ptr = p.ptr;
    ptr->incr();

    return *this;
}

/**
 * Equality operation.
 *
 * Called when one ManagedBuffer is tested to be equal to another using the '==' operator.
 *
 * @param p The ManagedBuffer to test ourselves against.
 * @return true if this ManagedBuffer is identical to the one supplied, false otherwise.
 * 
 * Example:
 * @code
 *
 * uint8_t buf = {13,5,2};
 * ManagedBuffer p1(16); 
 * ManagedBuffer p2(buf, 3);        
 *
 * if(p1 == p2)                    // will be true
 *     uBit.display.scroll("same!");
 * @endcode
 */
bool ManagedBuffer::operator== (const ManagedBuffer& p)
{
    if (ptr == p.ptr)
        return true;
    else
        return (ptr->length == p.ptr->length && (memcmp(ptr->payload, p.ptr->payload, ptr->length)==0));    
}

/**
 * Sets the byte at the given index to value provided.
 * @param position The index of the byte to change.
 * @param value The new value of the byte (0-255).
 * @return MICROBIT_OK, or MICROBIT_INVALID_PARAMETER.
 *
 * Example:
 * @code
 * ManagedBuffer p1(16); 
 * p1.setByte(0,255);              // Sets the firts byte in the buffer to the value 255.
 * @endcode
 */
int ManagedBuffer::setByte(int position, uint8_t value)
{
    if (0 <= position && position < ptr->length)
    {
        ptr->payload[position] = value;
        return MICROBIT_OK;
    }
    else
    {
        return MICROBIT_INVALID_PARAMETER;
    }
}

/**
 * Determines the value of the given byte in the buffer.
 *
 * @param position The index of the byte to read.
 * @return The value of the byte at the given position, or MICROBIT_INVALID_PARAMETER.
 *
 * Example:
 * @code
 * ManagedBuffer p1(16); 
 * p1.setByte(0,255);              // Sets the firts byte in the buffer to the value 255.
 * p1.getByte(0);                  // Returns 255.
 * @endcode
 */
int ManagedBuffer::getByte(int position)
{
    if (0 <= position && position < ptr->length)
        return ptr->payload[position];
    else
        return MICROBIT_INVALID_PARAMETER;
} 

/**
  * Get current ptr, do not decr() it, and set the current instance to an empty buffer.
  * This is to be used by specialized runtimes which pass BufferData around.
  */
BufferData *ManagedBuffer::leakData()
{
    BufferData* res = ptr;
    initEmpty();
    return res;
}


int ManagedBuffer::fill(uint8_t value, int offset, int length)
{
    if (offset < 0 || offset > ptr->length)
        return MICROBIT_INVALID_PARAMETER;
    if (length < 0)
        length = ptr->length;
    length = min(length, ptr->length - offset);

    memset(ptr->payload + offset, value, length);

    return MICROBIT_OK;
}

ManagedBuffer ManagedBuffer::slice(int offset, int length) const
{
    offset = min(ptr->length, offset);
    if (length < 0)
        length = ptr->length;
    length = min(length, ptr->length - offset);
    return ManagedBuffer(ptr->payload + offset, length);
}

void ManagedBuffer::shift(int offset, int start, int len)
{
    if (len < 0) len = ptr->length - start;    
    if (start < 0 || start + len > ptr->length || start + len < start
        || len == 0 || offset == 0 || offset == INT_MIN) return;
    if (offset <= -len || offset >= len) {
        fill(0);
        return;
    }
        
    uint8_t *data = ptr->payload + start;
    if (offset < 0) {
        offset = -offset;
        memmove(data + offset, data, len - offset);
        memset(data, 0, offset);
    } else {
        len = len - offset;
        memmove(data, data + offset, len);
        memset(data + len, 0, offset);
    }
}

void ManagedBuffer::rotate(int offset, int start, int len)
{
    if (len < 0) len = ptr->length - start;
    if (start < 0 || start + len > ptr-> length || start + len < start
        || len == 0 || offset == 0 || offset == INT_MIN) return;

    if (offset < 0)
        offset += len << 8; // try to make it positive
    offset %= len;
    if (offset < 0)
        offset += len;

    uint8_t *data = ptr->payload + start;

    uint8_t *n_first = data + offset;
    uint8_t *first = data;
    uint8_t *next = n_first;
    uint8_t *last = data + len;

    while (first != next) {
        uint8_t tmp = *first;
        *first++ = *next;
        *next++ = tmp;
        if (next == last) {
            next = n_first;
        } else if (first == n_first) {
            n_first = next;
        }
    }
}

int ManagedBuffer::writeBuffer(int dstOffset, const ManagedBuffer &src, int srcOffset, int length)
{
    if (length < 0)
        length = src.length();

    if (srcOffset < 0 || dstOffset < 0 || dstOffset > ptr->length)
        return MICROBIT_INVALID_PARAMETER;

    length = min(src.length() - srcOffset, ptr->length - dstOffset);

    if (length < 0)
        return MICROBIT_INVALID_PARAMETER;

    if (ptr == src.ptr) {
        memmove(getBytes() + dstOffset, src.ptr->payload + srcOffset, length);
    } else {
        memcpy(getBytes() + dstOffset, src.ptr->payload + srcOffset, length);
    }

    return MICROBIT_OK;
}

int ManagedBuffer::writeBytes(int offset, uint8_t *src, int length, bool swapBytes)
{
    if (offset < 0 || length < 0 || offset + length > ptr->length)
        return MICROBIT_INVALID_PARAMETER;

    if (swapBytes) {
        uint8_t *p = ptr->payload + offset + length;
        for (int i = 0; i < length; ++i)
            *--p = src[i];
    } else {
        memcpy(ptr->payload + offset, src, length);
    }

    return MICROBIT_OK;
}

int ManagedBuffer::readBytes(uint8_t *dst, int offset, int length, bool swapBytes) const
{
    if (offset < 0 || length < 0 || offset + length > ptr->length)
        return MICROBIT_INVALID_PARAMETER;

    if (swapBytes) {
        uint8_t *p = ptr->payload + offset + length;
        for (int i = 0; i < length; ++i)
            dst[i] = *--p;
    } else {
        memcpy(dst, ptr->payload + offset, length);
    }

    return MICROBIT_OK;
}
