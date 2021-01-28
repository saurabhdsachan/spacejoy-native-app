import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const {
      idToken,
      user: {name, email, photo},
    } = userInfo;
    const userData = {
      data: {
        name,
        email,
        picture: photo,
        channel: 'google',
      },
      token: idToken,
    };
    return userData;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      throw new Error('User Cancelled Sign in');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      throw new Error('Play Services not available');
    } else {
      throw new Error('Something went wrong');
    }
  }
};

export default signIn;
