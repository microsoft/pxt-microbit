#import <Foundation/Foundation.h>

@class DirectoryWatcher;

@protocol DirectoryWatcherDelegate <NSObject>

- (void)watcher:(DirectoryWatcher*)watcher observedNewFileAtPath:(NSString*)path;

@end

@interface DirectoryWatcher : NSObject

- (instancetype)initWithPath:(NSString*)path;

@property (readonly) NSString * path;

@property id<DirectoryWatcherDelegate> delegate;

- (void)startWatching;

//Automatically called when deallocated
- (void)stopWatching;

@end
