// helpful define to handle C++ differences in package
#define PXT_MICROBIT_TAGGED_INT 1

// cross version compatible way of access data field
#ifndef PXT_BUFFER_DATA
#define PXT_BUFFER_DATA(buffer) buffer->data
#endif

// cross version compatible way of access data length
#ifndef PXT_BUFFER_LENGTH
#define PXT_BUFFER_LENGTH(buffer) buffer->length
#endif

#ifndef PXT_CREATE_BUFFER
#define PXT_CREATE_BUFFER(data, len) pxt::mkBuffer(data, len)
#endif

// cross version compatible way of accessing string data
#ifndef PXT_STRING_DATA
#define PXT_STRING_DATA(str) str->getUTF8Data()
#endif

// cross version compatible way of accessing string length
#ifndef PXT_STRING_LENGTH
#define PXT_STRING_LENGTH(str) str->getLength()
#endif

#define PXT_POWI 1
