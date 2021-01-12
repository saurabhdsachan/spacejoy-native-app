/**
 * rxunityBridge Module
 * Author: Abhishek Deb
 * abhishekdeb91@gmail.com
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NativeModules, NativeEventEmitter} from 'react-native';

const RxUnityAdapter = () => {
  const {rxunityBridge} = NativeModules;
  const eventEmitter = new NativeEventEmitter(rxunityBridge);

  const AddMsgListener = (handler) => {
    useEventListener(eventEmitter, 'unityMsgVal', handler);
  };

  const AddReturnListener = (handler) => {
    useEventListener(eventEmitter, 'unityReturnVal', handler);
  };

  const OpenUnity = (e) => {
    NativeModules.rxunityBridge.OpenUnity(e || '');
  };

  const SendMsg = (e) => {
    NativeModules.rxunityBridge.SendMsg(e || '');
  };

  return {AddMsgListener, AddReturnListener, OpenUnity, SendMsg};
};

const useEventListener = (target, type, listener, ...options) => {
  React.useEffect(() => {
    const targetIsRef = target.hasOwnProperty('current');
    const currentTarget = targetIsRef ? target.current : target;
    if (currentTarget) {
      currentTarget.addListener(type, listener, ...options);
    }
    return () => {
      if (currentTarget) {
        currentTarget.removeListener(type, listener, ...options);
      }
    };
  }, [target, type, listener, options]);
};

export default RxUnityAdapter;
