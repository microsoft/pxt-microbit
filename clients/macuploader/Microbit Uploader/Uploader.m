#import "Uploader.h"

@interface Uploader ()

@property NSOperationQueue * backgroundCopyQueue;

@end

@implementation Uploader

- (instancetype)init {
    self = [super init];
    if (self) {
        self.backgroundCopyQueue = [NSOperationQueue new];
    }
    return self;
}

- (BOOL)shouldUploadFileAtPath:(NSString *)path {
    //Whilst Safari is downloading the file it appends .download to the name
    NSRegularExpression * ignoreDownload = [NSRegularExpression regularExpressionWithPattern:@".download$" options:NSRegularExpressionCaseInsensitive error:nil];
    if ([ignoreDownload numberOfMatchesInString:path.lastPathComponent options:0 range:NSMakeRange(0, path.lastPathComponent.length)] > 0) {
        return NO;
    }
    
    //Chrome and Firefox create .hex files
    NSRegularExpression * hexFiles = [NSRegularExpression regularExpressionWithPattern:@".hex$" options:NSRegularExpressionCaseInsensitive error:nil];
    if ([hexFiles numberOfMatchesInString:path.lastPathComponent options:0 range:NSMakeRange(0, path.lastPathComponent.length)] > 0) {
        return YES;
    }
    
    //Safari tends to just name files 'Unknown X'
    NSRegularExpression * unknownFiles = [NSRegularExpression regularExpressionWithPattern:@"^Unknown(( |-)[0-9]+)?" options:NSRegularExpressionCaseInsensitive error:nil];
    if ([unknownFiles numberOfMatchesInString:path.lastPathComponent options:0 range:NSMakeRange(0, path.lastPathComponent.length)]) {
        return YES;
    }
    
    return NO;
}

- (NSArray<NSString*>*)microBitPaths {
    NSArray<NSURL*>* allVolumes = [[NSFileManager defaultManager] mountedVolumeURLsIncludingResourceValuesForKeys:nil options:NSVolumeEnumerationSkipHiddenVolumes];
    NSMutableArray<NSString*>* microbitPaths = [NSMutableArray new];
    NSRegularExpression * microbitRegex = [NSRegularExpression regularExpressionWithPattern:@"^MICROBIT" options:NSRegularExpressionCaseInsensitive error:nil];
    for (NSURL * volume in allVolumes) {
        NSString * lastPathComponent = volume.lastPathComponent;
        if ([microbitRegex numberOfMatchesInString:lastPathComponent options:0 range:NSMakeRange(0, lastPathComponent.length)] > 0) {
            [microbitPaths addObject:volume.path];
        }
    }
    
    return microbitPaths;
}

- (void)uploadFile:(NSString *)file {
    for (NSString * microbit in [self microBitPaths]) {
        [self uploadFile:file toMicroBit:microbit];
    }
}

- (void)uploadFile:(NSString *)file toMicroBit:(NSString *)path {
    [self.backgroundCopyQueue addOperationWithBlock:^{
        NSError * copyError;
        NSString * destination = [path stringByAppendingPathComponent:file.lastPathComponent];
        if (![[NSFileManager defaultManager] copyItemAtPath:file toPath:destination error:&copyError]) {
            [self.delegate uploader:self failedToTransferFile:file toMicroBit:path.lastPathComponent];
        }
        else {
            [self.delegate uploader:self transferredFile:file toMicroBit:path.lastPathComponent];
        }
    }];
}

@end
