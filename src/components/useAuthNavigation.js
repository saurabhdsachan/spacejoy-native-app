import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const useAuthNavigation = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const authWithCallback = async ({ callback = () => {}, redirectRouteData = {}, redirectUrl = '', dispatch }) => {
    const currentRoute = route.name;
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        callback();
        if (redirectUrl) {
          navigation.navigate(redirectUrl);
        }
      } else {
        // take user to sign in screen
        dispatch({
          type: 'SET_AUTH_FLOW_CONTEXT',
          payload: { callback, currentRoute, redirectUrl, redirectRouteData },
        });

        navigation.navigate('Auth', { screen: 'Login', flow: 'login', layout: 'modal' });
      }
    } catch {
      navigation.navigate(currentRoute);
    }
  };
  return {
    authWithCallback,
  };
};

export default useAuthNavigation;
