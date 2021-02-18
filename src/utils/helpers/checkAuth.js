import AsyncStorage from '@react-native-async-storage/async-storage';

const checkAuth = async (navigationObj, additionalParams, callback = () => {}, redirectUrl, currentRoute) => {
  // additionalParams describe data to be sent to new route
  // callback is function to br called on success
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      // user is logged in. Perform action directly
      callback && callback();
      navigationObj.navigate(redirectUrl, { ...additionalParams });
    } else {
      navigationObj.navigate('Auth', {
        screen: 'Login',
        params: { additionalParams, callback, redirectUrl, currentRoute },
      });
    }
  } catch (e) {
    // Error in fetching token
    navigationObj.navigate('Auth', {
      screen: 'Login',
      params: { additionalParams, callback, redirectUrl, currentRoute },
    });
  }
};

export default checkAuth;
