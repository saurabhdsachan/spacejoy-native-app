import AppleButton from '@components/AppleButton';
import Button from '@components/Button';
import FacebookLoginButton from '@components/FacebookLoginButton';
import GoogleLoginButton from '@components/GoogleLoginButton';
import { Block } from '@components/index';
import LoginError from '@components/LoginError';
import Text from '@components/Text';
import { COLORS, images, SIZES } from '@constants/index';
import AuthNavigationContext from '@utils/helpers/AuthNavigationContext';
import { AuthContext } from '@utils/helpers/withAuthContext';
import { login, oAuthLogin } from '@utils/logins';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';

const { bg } = images;

const Login = ({ navigation, route }) => {
  const { signIn } = React.useContext(AuthContext);
  const authNavContext = React.useContext(AuthNavigationContext);
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const { dispatch } = authNavContext;
    const {
      params: { redirectUrl = '', additionalParams, currentRoute },
    } = route;
    if (redirectUrl.length) {
      dispatch({
        type: 'ADD_REDIRECT_ROUTE',
        payload: { redirectRouteData: additionalParams, redirectUrl, currentRoute },
      });
    }
  }, []);

  const handleRedirectToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleSigninSuccess = async (userData = {}, token, authCode) => {
    // perform oAuth
    const { data: userInfo = {} } = userData;
    const { channel = '' } = userInfo;
    if (channel) {
      try {
        const { token: userToken } = await oAuthLogin(userInfo, token, channel, authCode);
        const localUserObject = {
          ...userData,
          token: userToken,
        };
        // sign in to local app state
        signIn(localUserObject);
        handlePostLoginFunctions();
      } catch (e) {
        setLoading(false);
        setLoginError(e.message);
      }
    }
  };
  const handlePostLoginFunctions = () => {
    const { state } = authNavContext;
    if (state.redirectUrl && state.redirectUrl.length) {
      if (state.redirectRouteData) {
        console.log('redirection data', state.redirectRouteData);
        navigation.navigate(state.redirectUrl, { ...state.redirectRouteData });
      } else {
        navigation.navigate(state.redirectUrl);
      }
    }
  };

  const handleSigninError = (errorMessage) => {
    // hide loader
    setLoading(false);
    // display error
    setLoginError(errorMessage);
  };

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const res = await login(email, password);
        if (res) {
          const { token, user } = res;
          const loginObj = {
            token,
            data: { ...user },
          };
          signIn(loginObj);
          handlePostLoginFunctions();
        } else {
          setLoading(false);
          setLoginError('Incorrect username and password');
        }
      } catch (e) {
        setLoading(false);
        setLoginError('Incorrect username and password');
      }
    }
  };
  const closeModal = () => {
    const { state } = authNavContext;
    state?.currentRoute && navigation.navigate(state.currentRoute);
  };
  return (
    <Block>
      {/* <Block color="rgba(0,0,0,0.5)" flex={1}>
        <TouchableWithoutFeedback style={{ backgroundColor: 'red' }} />
      </Block> */}
      <TouchableWithoutFeedback onPress={closeModal}>
        <Block color="rgba(0,0,0,0.5)" flex={1} />
      </TouchableWithoutFeedback>
      <Block flex={3} color="white">
        <KeyboardAvoidingView style={styles.container}>
          {loading && (
            <Block center middle color={COLORS.semiTransparent} style={{ ...StyleSheet.absoluteFill, zIndex: 1 }}>
              <ActivityIndicator size="small" />
            </Block>
          )}
          <Block padding={SIZES.padding}>
            <Block flex={1}>
              <Text h2 mb1>
                Login
              </Text>
              <Text small mb3>
                Welcome Back
              </Text>
              {loginError && (
                <Block flex={0.5} bottom>
                  <LoginError errorText={loginError} />
                </Block>
              )}
            </Block>
            <Block flex={2} middle>
              <Block flex={false}>
                <TextInput
                  keyboardType="email-address"
                  placeholderTextColor={COLORS.gray}
                  style={styles.textInput}
                  placeholder="Your email"
                  onChangeText={(text) => setEmailAddress(text)}
                />
              </Block>
              <Block flex={false}>
                <TextInput
                  placeholderTextColor={COLORS.gray}
                  style={styles.textInput}
                  placeholder="Your password"
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                />
              </Block>
              <Block flex={false}>
                <Button gradient onPress={handleLogin} style={{ borderRadius: SIZES.radius / 4 }}>
                  {loading ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <Text center white size={16}>
                      Login
                    </Text>
                  )}
                </Button>
              </Block>
            </Block>
            <Block middle flex={0.5}>
              <Text color={COLORS.gray} center>
                --- or ---
              </Text>
            </Block>
            <Block flex={1} row>
              <Block style={{ marginRight: SIZES.padding }}>
                <GoogleLoginButton
                  handleSignInSuccess={handleSigninSuccess}
                  handleSigninError={handleSigninError}
                  onTap={() => {
                    setLoginError(false);
                    setLoading(true);
                  }}
                />
              </Block>
              <Block>
                <FacebookLoginButton
                  handleSignInSuccess={handleSigninSuccess}
                  handleSigninError={handleSigninError}
                  onTap={() => {
                    setLoginError(false);
                    setLoading(true);
                  }}
                />
              </Block>
            </Block>
            <Block flex={1.5}>
              <AppleButton
                handleSignInSuccess={handleSigninSuccess}
                handleSigninError={handleSigninError}
                onTap={() => {
                  setLoginError(false);
                  setLoading(true);
                }}
              />
            </Block>
            <Block flex={2} top center color="white">
              <Button raw onPress={handleRedirectToSignUp}>
                <Text>
                  Create New Account <Text primary>Sign Up</Text>
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  textInput: {
    borderColor: COLORS.gray,
    borderWidth: 1,
    padding: SIZES.padding / 2,
    borderRadius: SIZES.radius / 6,
    marginBottom: SIZES.padding / 2,
  },
  imageBg: {
    flex: 1,
    height: 200,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
  },
});

export default Login;
