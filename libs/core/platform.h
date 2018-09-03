// helpful define to handle C++ differences in package
#define PXT_MICROBIT_TAGGED_INT 1

// cross version compatible way of access data field
#ifndef PXT_BUFFER_DATA
#define PXT_BUFFER_DATA(buffer) buffer->data
#endif

#ifndef PXT_CREATE_BUFFER
#define PXT_CREATE_BUFFER(data, len) pxt::mkBuffer(data, len)
#endif

#define PXT_POWI 1
