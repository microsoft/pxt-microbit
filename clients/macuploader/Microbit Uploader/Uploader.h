#import <Foundation/Foundation.h>

@class Uploader;

@protocol UploaderDelegate <NSObject>

- (void)uploader:(Uploader*)uploader transferredFile:(NSString*)file toMicroBit:(NSString*)microbit;
- (void)uploader:(Uploader*)uploader failedToTransferFile:(NSString*)file toMicroBit:(NSString*)microbit;

@end

@interface Uploader : NSObject

@property id<UploaderDelegate> delegate;

- (BOOL)shouldUploadFileAtPath:(NSString*)path;
- (NSArray<NSString*>*)microBitPaths;
- (void)uploadFile:(NSString*)file;
- (void)uploadFile:(NSString*)file toMicroBit:(NSString*)path;

@end
