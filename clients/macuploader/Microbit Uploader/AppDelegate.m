#import "AppDelegate.h"
#import "DirectoryWatcher.h"
#import "Uploader.h"

@interface AppDelegate ()<DirectoryWatcherDelegate, UploaderDelegate, NSUserNotificationCenterDelegate>

@property DirectoryWatcher * watcher;
@property Uploader * uploader;
@property NSStatusItem * menubarItem;

@end

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
    // Insert code here to initialize your application
    self.watcher = [[DirectoryWatcher alloc] initWithPath:[self downloadsDirectory]];
    self.watcher.delegate = self;
    [self.watcher startWatching];
    
    self.uploader = [[Uploader alloc] init];
    self.uploader.delegate = self;
    
    [NSUserNotificationCenter defaultUserNotificationCenter].delegate = self;
    
    [self createMenuBarIcon];
    [self configureVolumeMountNotifications];
    [self showActiveMicroBits];
}

- (void)applicationWillTerminate:(NSNotification *)aNotification {
    // Insert code here to tear down your application
    [self.watcher stopWatching];
}

- (void)dealloc {
    [[NSWorkspace sharedWorkspace].notificationCenter removeObserver:self];
}

#pragma mark - Directory

- (void)watcher:(DirectoryWatcher *)watcher observedNewFileAtPath:(NSString *)path {
    NSString * fullPath = [watcher.path stringByAppendingPathComponent:path];
    if ([self.uploader shouldUploadFileAtPath:fullPath]) {
        [self.uploader uploadFile:fullPath];
    }
}

- (NSString*)downloadsDirectory {
    NSArray * paths = NSSearchPathForDirectoriesInDomains(NSDownloadsDirectory, NSUserDomainMask, YES);
    return paths.firstObject;
}

#pragma mark - Uploader delegate

- (void)uploader:(Uploader *)uploader transferredFile:(NSString *)file toMicroBit:(NSString *)microbit {
    [self showNotification:@"micro:bit upload" withDescription:[NSString stringWithFormat:@"%@ uploaded to %@", file.lastPathComponent, microbit]];
}

- (void)uploader:(Uploader *)uploader failedToTransferFile:(NSString *)file toMicroBit:(NSString *)microbit {
    [self showNotification:@"micro:bit upload failed" withDescription:[NSString stringWithFormat:@"Couldn't transfer %@ to %@", file.lastPathComponent, microbit]];
}

- (void)showNotification:(NSString*)title withDescription:(NSString*)description {
    NSUserNotification * notification = [NSUserNotification new];
    notification.title = title;
    notification.informativeText = description;
    notification.soundName = NSUserNotificationDefaultSoundName;
    [[NSUserNotificationCenter defaultUserNotificationCenter] deliverNotification:notification];
}

#pragma mark - NSUserNotificationCenterDelegate

- (BOOL)userNotificationCenter:(NSUserNotificationCenter *)center shouldPresentNotification:(NSUserNotification *)notification {
    return YES;
}

#pragma mark - Volume mount/unmount notification

- (void)configureVolumeMountNotifications {
    [[NSWorkspace sharedWorkspace].notificationCenter addObserver:self selector:@selector(volumeMountNotification:) name:NSWorkspaceDidRenameVolumeNotification object:nil];
    [[NSWorkspace sharedWorkspace].notificationCenter addObserver:self selector:@selector(volumeMountNotification:) name:NSWorkspaceDidMountNotification object:nil];
    [[NSWorkspace sharedWorkspace].notificationCenter addObserver:self selector:@selector(volumeMountNotification:) name:NSWorkspaceDidUnmountNotification object:nil];
}

- (void)volumeMountNotification:(NSNotification*)sender {
    //Delay upadting the menu to give the chance for the disk to fully mount or unmount
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self showActiveMicroBits];
    });
}

#pragma mark - Menu bar app

- (void)createMenuBarIcon {
    self.menubarItem = [[NSStatusBar systemStatusBar] statusItemWithLength:NSSquareStatusItemLength];
    self.menubarItem.button.image = [NSImage imageNamed:@"menubar"];
}

- (void)showActiveMicroBits {
    NSMenu * menu = [NSMenu new];
    NSString * countString;
    NSUInteger count = self.uploader.microBitPaths.count;
    if (count == 0) {
        countString = @"No connect micro:bits";
    }
    else if (count == 1) {
        countString = @"1 connected micro:bit";
    }
    else {
        countString = [NSString stringWithFormat:@"%lu connected micro:bits", count];
    }
    NSMenuItem * microBitCount = [[NSMenuItem alloc] initWithTitle:countString action:nil keyEquivalent:@""];
    microBitCount.enabled = NO;
    [menu addItem:microBitCount];
    
    NSMenuItem * websiteItem = [[NSMenuItem alloc] initWithTitle:@"Editor" action:@selector(launchEditor:) keyEquivalent:@"e"];
    [menu addItem:websiteItem];
    
    NSMenuItem * quitItem = [[NSMenuItem alloc] initWithTitle:@"Quit" action:@selector(terminate:) keyEquivalent:@"q"];
    [menu addItem:quitItem];
    
    self.menubarItem.menu = menu;
}

- (void)launchEditor:(id)sender {
    [[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:@"https://makecode.microbit.org/"]];
}

@end
