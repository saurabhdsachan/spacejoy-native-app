#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import "RNBootSplash.h"

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>



static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif


#define nullptr ((void*)0)

int gArgc = 0;
char** gArgv = nullptr;
NSDictionary* appLaunchOpts;
bool isUnityInit=false;

UnityFramework* UnityFrameworkLoad()
{
  NSLog(@"[SYSTEM] Inside UFW");
  NSString* bundlePath = nil;
  bundlePath = [[NSBundle mainBundle] bundlePath];
  bundlePath = [bundlePath stringByAppendingString: @"/Frameworks/UnityFramework.framework"];
  
  NSBundle* bundle = [NSBundle bundleWithPath: bundlePath];
  if ([bundle isLoaded] == false) [bundle load];
  
  UnityFramework* ufw = [bundle.principalClass getInstance];
  if (![ufw appController])
  {
    // unity is not initialized
    [ufw setExecuteHeader: &_mh_execute_header];
  }
  return ufw;
}

@implementation AppDelegate
UIViewController *rootViewController;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"spacejoy"
                                            initialProperties:nil];


  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(rcvNSNOTFOpenUnity:)
                                               name:@"OpenUnity"
                                             object:nil];

  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(rcvNSNOTFSendMsg2Unity:)
                                               name:@"SendMsg2Unity"
                                             object:nil];

  return YES;
}

- (bool)unityIsInitialized { return [self ufw] && [[self ufw] appController]; }

- (void)ShowMainView
{
  [self initUnity];
  [[self ufw] showUnityWindow];
}

- (void)showHostMainWindow
{
  [self showHostMainWindow:@""];
}

- (void)showHostMainWindow:(NSString*)msg
{
  NSLog(@"[HOST] openReact: %@",msg);
  // [(CrossAppTalk*)self.cspacejoyCrossAppTalk returnResult:msg];
  [(rxunityBridge*)self.cspacejoyRxUnity returnResult:msg];
  
  [self.window makeKeyAndVisible];
}

- (void)sendMsgToUnity:(NSString*)cmd
{
  [[self ufw] sendMessageToGOWithName: "rxunityBridge" functionName: "UnityCallbackEvent" message: [cmd UTF8String]];
}

- (void)sendMessageToReact:(NSString*)message
{
//  NSLog(@"[HOST] sndmsg:XXX ");
  if( !message || [message isKindOfClass:[NSNull class]] )
    return;
  
  NSLog(@"[HOST] sndmsg: %@",message);
  
  [(rxunityBridge*)self.cspacejoyRxUnity receivedMessageFromUnity:message];
}

- (void)initUnity
{
  
  if(isUnityInit){
    return;
  }
  
  if([self unityIsInitialized]) {
    NSLog(@"Unity already initialized >> Unload Unity first");
    return;
  }
  
  
  isUnityInit=true;
  
  [self setUfw: UnityFrameworkLoad()];
  // Set UnityFramework target for Unity-iPhone/Data folder to make Data part of a UnityFramework.framework and uncomment call to setDataBundleId
  // ODR is not supported in this case, ( if you need embedded and ODR you need to copy data )
  [[self ufw] setDataBundleId: "com.unity3d.framework"];
  [[self ufw] registerFrameworkListener: self];
  [NSClassFromString(@"FrameworkLibAPI") registerAPIforNativeCalls:self];
  
  [[self ufw] runEmbeddedWithArgc: gArgc argv: gArgv appLaunchOpts: appLaunchOpts];
}


// Listeners

- (void) rcvNSNOTFOpenUnity:(NSNotification *) notification
{
  
  if ([[notification name] isEqualToString:@"OpenUnity"]){
    NSLog (@"Successfully received the test notification!");
    NSDictionary* userInfo = notification.userInfo;
    NSString* data = (NSString*)userInfo[@"data"];
//    NSLog(data);
    [self ShowMainView];
    [self sendMsgToUnity:data];
  }
}

- (void) rcvNSNOTFSendMsg2Unity:(NSNotification *) notification
{
  
  if ([[notification name] isEqualToString:@"SendMsg2Unity"]){
    NSLog (@"Successfully received the test notification!");
    NSDictionary* userInfo = notification.userInfo;
    NSString* data = (NSString*)userInfo[@"data"];
    [self sendMsgToUnity:data];
  }
}

// Dispatchers
- (void) disNSNOTFOpenUnity
{
  // All instances of TestClass will be notified
  [[NSNotificationCenter defaultCenter]
   postNotificationName:@"OpenUnity"
   object:self];
  
}


- (void) disNSNOTFSendMsg2Unity
{
  
  // All instances of TestClass will be notified
  [[NSNotificationCenter defaultCenter]
   postNotificationName:@"SendMsg2Unity"
   object:self];
  
}





- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

void showAlert(NSString* title, NSString* msg) {
  UIAlertController* alert = [UIAlertController alertControllerWithTitle:title message:msg                                                         preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"Ok" style:UIAlertActionStyleDefault
                                                        handler:^(UIAlertAction * action) {}];
  [alert addAction:defaultAction];
  auto delegate = [[UIApplication sharedApplication] delegate];
  [rootViewController presentViewController:alert animated:YES completion:nil];
}

@end



int main(int argc, char* argv[])
{
  gArgc = argc;
  gArgv = argv;
  
  @autoreleasepool
  {
    if (false)
    {
      // run UnityFramework as main app
      id ufw = UnityFrameworkLoad();
      
      // Set UnityFramework target for Unity-iPhone/Data folder to make Data part of a UnityFramework.framework and call to setDataBundleId
      // ODR is not supported in this case, ( if you need embedded and ODR you need to copy data )
      [ufw setDataBundleId: "com.unity3d.framework"];
      [ufw runUIApplicationMainWithArgc: argc argv: argv];
      NSLog(@"[SYSTEM] Crazy unity");
    } else {
      // run host app first and then unity later
      UIApplicationMain(argc, argv, nil, [NSString stringWithUTF8String: "AppDelegate"]);
      NSLog(@"[SYSTEM] Crazy React");
    }
  }
  
  return 0;
}
