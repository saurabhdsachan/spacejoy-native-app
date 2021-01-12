//
//  rxunityBridge.h
//  rxunitySpacejoy
//
//  Created by Abhishek Deb on 01/01/21. ..
//  abhishekdeb91@gmail.com
//  
#import <React/RCTBridgeModule.h>
#import "AppDelegate.h"
#import <React/RCTEventEmitter.h>

@interface rxunityBridge : RCTEventEmitter <RCTBridgeModule>

@property (readwrite, strong) NSString* cachedCallbackId;
- (void) receivedMessageFromUnity:(NSString*)message;
- (void) returnResult:(NSString*)result;
@end
