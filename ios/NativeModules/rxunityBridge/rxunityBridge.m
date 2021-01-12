//
//  rxunityBridge.m
//  rxunitySpacejoy
//
//  Created by Abhishek Deb on 01/01/21.
//  abhishekdeb91@gmail.com
//

#import <Foundation/Foundation.h>

#import <UIKit/UIKit.h>
#import "rxunityBridge.h"

@implementation rxunityBridge{
  bool hasListeners;
}

// Will be called when this module's first listener is added.
-(void)startObserving {
  hasListeners = YES;
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
  hasListeners = NO;
}

//export the name of the native module as 'Device' since no explicit name is mentioned
RCT_EXPORT_MODULE();

//exports a method getDeviceName to javascript
RCT_EXPORT_METHOD(OpenUnity:(NSString *)data){
  NSLog(@"[React Native Plugin]: Opening Unity");

  // Start in Main Thread only.
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    appDelegate.cspacejoyRxUnity = self;
    
    NSDictionary* userInfoDictionary = @{@"data": data};
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"OpenUnity"
     object:self
     userInfo:userInfoDictionary];
    NSLog(@"Launching Unity");
  });

}


RCT_EXPORT_METHOD(SendMsg:(NSString *)data){
  NSLog(@"[React Native Plugin]: Sending to Unity ");
  
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    appDelegate.cspacejoyRxUnity = self;
    
    NSDictionary* userInfoDictionary = @{@"data": data};
    [[NSNotificationCenter defaultCenter]
     postNotificationName:@"SendMsg2Unity"
     object:self
     userInfo:userInfoDictionary];
    NSLog(@"Launching Unity");
  });
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"unityReturnVal",@"unityMsgVal"];
}



- (void)receivedMessageFromUnity:(NSString*)message
{
  NSString *s = @"[Native Plugin] Msg Rcvd from Unity : ";
  s = [s stringByAppendingString:message];
  NSLog(@"%@", s);
  if (hasListeners) {
    NSLog(@"[Native Plugin] Sending to unityMsgVal");
    [self sendEventWithName:@"unityMsgVal" body:message];
  }
}

- (void)returnResult:(NSString*)result
{
  NSString *s = @"[Native Plugin] Result returned: ";
  s = [s stringByAppendingString:result];
  NSLog(@"%@", s);
  
  if (hasListeners) {
    [self sendEventWithName:@"unityReturnVal" body:result];
  }
}

@end

