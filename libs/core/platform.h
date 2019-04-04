// helpful define to handle C++ differences in package
#define PXT_MICROBIT_TAGGED_INT 1

// cross version compatible way of access data field
#ifndef PXT_BUFFER_DATA
#define PXT_BUFFER_DATA(buffer) buffer->data
#endif

#ifndef PXT_CREATE_BUFFER
#define PXT_CREATE_BUFFER(data, len) pxt::mkBuffer(data, len)
#endif

// cross version compatible way of accessing string data
#ifndef PXT_BOXED_STRING_DATA
#define PXT_BOXED_STRING_DATA(boxedString) boxedString->getUTF8Data()
#endif

// cross version compatible way of accessing string size
#ifndef PXT_BOXED_STRING_SIZE
#define PXT_BOXED_STRING_SIZE(boxedString) boxedString->getUTF8Size()
#endif

#define PXT_POWI 1
