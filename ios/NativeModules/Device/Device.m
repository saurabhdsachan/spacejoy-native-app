//
//  Device.m
//  rxunitySpacejoy
//
//  Created by Abhishek Deb on 01/01/21.
//  abhishekdeb91@gmail.com
//

#import "Device.h"
#import <UIKit/UIKit.h>

@implementation Device

//export the name of the native module as 'Device' since no explicit name is mentioned
RCT_EXPORT_MODULE();

//exports a method getDeviceName to javascript
RCT_EXPORT_METHOD(getDeviceName:(RCTResponseSenderBlock)callback){
  @try{
    NSString *deviceName = [[UIDevice currentDevice] name];
    callback(@[[NSNull null], deviceName]);
  }
  @catch(NSException *exception){
    callback(@[exception.reason, [NSNull null]]);
  }
}

RCT_EXPORT_METHOD(getDeviceBattery: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  @try{
    UIDevice *myDevice = [UIDevice currentDevice];
    [myDevice setBatteryMonitoringEnabled:YES];

    double batLeft = (float)[myDevice batteryLevel] * 100;
    resolve(@(batLeft));
  }@catch(NSException *exception){
    reject(@"Error Device Battery",exception.reason,nil);
  }
}

@end

