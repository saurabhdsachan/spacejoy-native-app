#import <React/RCTBridgeDelegate.h>
#include <UnityFramework/UnityFramework.h>
#include <UnityFramework/NativeCallProxy.h>
#import <UIKit/UIKit.h>
#import "rxunityBridge.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>


@property (nonatomic, strong) UIWindow *window;
@property(nonatomic,retain) id cspacejoyRxUnity;

// Debamswamy
@property UnityFramework* ufw;
- (void)initUnity;
- (void)ShowMainView;
- (void)sendMsgToUnity:(NSString*)cmd;
@end
