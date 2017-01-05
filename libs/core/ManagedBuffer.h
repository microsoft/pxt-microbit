#ifndef MICROBIT_MANAGED_BUFFER_H
#define MICROBIT_MANAGED_BUFFER_H

#include "mbed.h"
#include "RefCounted.h"

struct BufferData : RefCounted
{
    uint16_t        length;             // The length of the payload in bytes
    uint8_t         payload[0];         // ManagedBuffer data
};

/**
  * Class definition for a ManagedBuffer.
  * A ManagedBuffer holds a series of bytes, used with MicroBitRadio channels and in other places.
  * n.b. This is a mutable, managed type.
  */
class ManagedBuffer
{
    BufferData      *ptr;     // Pointer to payload data
    
    public:

    /**
      * Default Constructor. 
      * Creates an empty ManagedBuffer.  The 'ptr' field in all empty buffers is shared.
      *
      * Example:
      * @code
      * ManagedBuffer p(); 
      * @endcode
      */
    ManagedBuffer();

    /**
      * Constructor. 
      * Creates a new ManagedBuffer of the given size. 
      *
      * @param length The length of the buffer to create.
      *
      * Example:
      * @code
      * ManagedBuffer p(16);         // Creates a ManagedBuffer 16 bytes long.
      * @endcode
      */
    ManagedBuffer(int length);

    /**
      * Constructor. 
      * Creates an empty ManagedBuffer of the given size,
      * and fills it with the data provided.
      *
      * @param data The data with which to fill the buffer.
      * @param length The length of the buffer to create.
      * 
      * Example:
      * @code
      * uint8_t buf[] = {13,5,2};
      * ManagedBuffer p(buf, 3);         // Creates a ManagedBuffer 3 bytes long.
      * @endcode
      */
    ManagedBuffer(uint8_t *data, int length);

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
    ManagedBuffer(const ManagedBuffer &buffer);

    /**
      * Constructor. 
      * Create a buffer from a raw BufferData pointer. It will ptr->incr(). This is to be used by specialized runtimes.
      *
      * @param p The pointer to use.
      */    
    ManagedBuffer(BufferData *p);

    /**
      * Internal constructor helper.
      * Configures this ManagedBuffer to refer to the static empty buffer.
      */
    void initEmpty();

    /**
     * Internal constructor-initialiser.
     *
     * @param data The data with which to fill the buffer.
     * @param length The length of the buffer to create.
     * 
     */
    void init(uint8_t *data, int length);

    /**
      * Destructor. 
      * Removes buffer resources held by the instance.
      */
    ~ManagedBuffer();

    /**
      * Provide an array containing the buffer data.
      * @return The contents of this buffer, as an array of bytes.
      */
    uint8_t *getBytes()
    {
        return ptr->payload;
    }

    /**
      * Get current ptr, do not decr() it, and set the current instance to an empty buffer.
      * This is to be used by specialized runtimes which pass BufferData around.
      */
    BufferData *leakData();

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
    ManagedBuffer& operator = (const ManagedBuffer& p);

    /**
     * Array access operation (read). 
     *
     * Called when a ManagedBuffer is dereferenced with a [] operation.
     * Transparently map this through to the underlying payload for elegance of programming.
     *
     * Example:
     * @code
     * ManagedBuffer p1(16); 
     * uint8_t data = p1[0];
     * @endcode
     */
    uint8_t operator [] (int i) const
    {
        return ptr->payload[i];
    }

    /**
     * Array access operation (modify). 
     *
     * Called when a ManagedBuffer is dereferenced with a [] operation.
     * Transparently map this through to the underlying payload for elegance of programming.
     *
     * Example:
     * @code
     * ManagedBuffer p1(16); 
     * p1[0] = 42;
     * @endcode
     */
    uint8_t& operator [] (int i)
    {
        return ptr->payload[i];
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
    bool operator== (const ManagedBuffer& p);
    
    /**
      * Sets the byte at the given index to value provided.
      * @param position The index of the byte to change.
      * @param value The new value of the byte (0-255).
      * @return MICROBIT_OK, or MICROBIT_INVALID_PARAMETER.
      *
      * Example:
      * @code
      * ManagedBuffer p1(16); 
      * p1.setByte(0,255);              // Sets the first byte in the buffer to the value 255.
      * @endcode
      */
    int setByte(int position, uint8_t value);

    /**
      * Determines the value of the given byte in the buffer.
      *
      * @param position The index of the byte to read.
      * @return The value of the byte at the given position, or MICROBIT_INVALID_PARAMETER.
      *
      * Example:
      * @code
      * ManagedBuffer p1(16); 
      * p1.setByte(0,255);              // Sets the first byte in the buffer to the value 255.
      * p1.getByte(0);                  // Returns 255.
      * @endcode
      */
    int getByte(int position);

    /**
      * Gets number of bytes in this buffer 
      * @return The size of the buffer in bytes.
      * 
      * Example:
      * @code
      * ManagedBuffer p1(16); 
      * p1.length();                 // Returns 16.
      * @endcode
      */
    int length() const { return ptr->length; }

    int fill(uint8_t value, int offset = 0, int length = -1);

    ManagedBuffer slice(int offset = 0, int length = -1) const;

    void shift(int offset, int start = 0, int length = -1);

    void rotate(int offset, int start = 0, int length = -1);

    int readBytes(uint8_t *dst, int offset, int length, bool swapBytes = false) const;

    int writeBytes(int dstOffset, uint8_t *src, int length, bool swapBytes = false);

    int writeBuffer(int dstOffset, const ManagedBuffer &src, int srcOffset = 0, int length = -1);

    bool isReadOnly() const { return ptr->isReadOnly(); }
};

#endif

