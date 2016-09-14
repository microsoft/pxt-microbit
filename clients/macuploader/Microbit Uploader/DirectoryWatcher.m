#import "DirectoryWatcher.h"
#import <CoreServices/CoreServices.h>

void callback(ConstFSEventStreamRef streamRef, void * info, size_t numEvents, void * eventPaths, const FSEventStreamEventFlags eventFlags[], const FSEventStreamEventId eventIds[]);

@interface DirectoryWatcher ()

@property NSString * path;
@property NSMutableSet<NSString*>* knownFiles;
@property FSEventStreamRef stream;

- (void)rescanPathWithEvents:(BOOL)sendEvents;

@end

@implementation DirectoryWatcher

- (instancetype)initWithPath:(NSString *)path {
    if (!path) {
        return nil;
    }
    
    self = [super init];
    if (self) {
        self.path = path;
    }
    return self;
}

- (void)dealloc {
    [self stopWatching];
}

- (void)startWatching {
    self.knownFiles = [NSMutableSet new];
    [self rescanPathWithEvents:NO];
    
    CFStringRef path = (__bridge CFStringRef)(self.path);
    CFArrayRef pathsToWatch = CFArrayCreate(NULL, (const void**)&path, 1, NULL);
    CFAbsoluteTime latency = 1;
    FSEventStreamContext context = { 0, (__bridge void * _Nullable)(self), NULL, NULL, NULL };
    self.stream = FSEventStreamCreate(NULL, &callback, &context, pathsToWatch, kFSEventStreamEventIdSinceNow, latency, kFSEventStreamCreateFlagNone);
    FSEventStreamScheduleWithRunLoop(self.stream, CFRunLoopGetCurrent(), kCFRunLoopDefaultMode);
    FSEventStreamStart(self.stream);
}

- (void)stopWatching {
    if (self.stream) {
        FSEventStreamStop(self.stream);
        FSEventStreamInvalidate(self.stream);
        FSEventStreamRelease(self.stream);
        self.stream = nil;
    }
}

- (void)rescanPathWithEvents:(BOOL)sendEvents {
    NSArray<NSString*>* downloadFiles = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:self.path error:nil];
    for (NSString * file in downloadFiles) {
        if (![self.knownFiles containsObject:file]) {
            if (sendEvents) {
                [self.delegate watcher:self observedNewFileAtPath:file];
            }
            [self.knownFiles addObject:file];
        }
    }
}

@end

void callback(ConstFSEventStreamRef streamRef, void * info, size_t numEvents, void * eventPaths, const FSEventStreamEventFlags eventFlags[], const FSEventStreamEventId eventIds[]) {
    DirectoryWatcher * watcher = (__bridge DirectoryWatcher*)info;
    [watcher rescanPathWithEvents:YES];
}
