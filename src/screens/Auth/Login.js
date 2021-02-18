import AppleButton from '@components/AppleButton';
import Button from '@components/Button';
import FacebookLoginButton from '@components/FacebookLoginButton';
import GoogleLoginButton from '@components/GoogleLoginButton';
import { Block } from '@components/index';
import LoginError from '@components/LoginError';
import Text from '@components/Text';
import { COLORS, images, SIZES } from '@constants/index';
import { AuthNavigationContext } from '@utils/helpers/AuthNavigationContext';
import { AuthContext } from '@utils/helpers/withAuthContext';
import { login, oAuthLogin } from '@utils/logins';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput
} from 'react-native';

const { bg } = images;

const Login = ({ navigation, flow }) => {
  const { signIn } = React.useContext(AuthContext);

  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { state, dispatch } = React.useContext(AuthNavigationContext);

  const handleRedirectToSignUp = () => {
    navigation.navigate('Auth', { screen: 'SignUp', flow: 'signup', layout: 'screen' });
  };

  const handlePostSignIn = async () => {
    const { callback, redirectUrl, currentRoute, redirectRouteData, defaultNavigationTo } = state;
    const redirectTo = redirectUrl || currentRoute || defaultNavigationTo;
    callback();
    navigation.navigate(redirectTo, { params: redirectRouteData });
    dispatch({ type: 'RESET_AUTH_FLOW_CONTEXT' });
  };
  useEffect(() => {}, []);
  const handleSigninSuccess = async (userData = {}, token, authCode) => {
    // perform oAuth
    const { data: userInfo = {} } = userData;
    const { channel = '' } = userInfo;
    if (channel) {
      try {
        const { token: userToken, user } = await oAuthLogin(userInfo, token, channel, authCode);
        const localUserObject = {
          ...userData,
          ...(!userData.email && { email: user.email }),
          token: userToken,
        };
        // sign in to local app state
        signIn(localUserObject);
        setLoading(false);
        handlePostSignIn();
      } catch (e) {
        setLoading(false);
        setLoginError(e.message);
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
          handlePostSignIn();
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
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground source={bg} style={styles.imageBg}>
        {loading && (
          <Block center middle color={COLORS.semiTransparent} style={{ ...StyleSheet.absoluteFill, zIndex: 1 }}>
            <ActivityIndicator size="small" />
          </Block>
        )}

        <Block style={styles.skipHolder}>
          <Button
            color={COLORS.semiTransparent}
            size="xs"
            onPress={() => {
              navigation.navigate('Home');
            }}
          >
            <Text>SKIP</Text>
          </Button>
        </Block>

        <Block flex={false} padding={[SIZES.height * 0.18, SIZES.padding * 2, 0, SIZES.padding * 2]}>
          <Text title mb1>
            Login
          </Text>
          <Text small mb4>
            Welcome Back
          </Text>
          {loginError && (
            <Block flex={3} bottom>
              <LoginError errorText={loginError} />
            </Block>
          )}
          <Block flex={false} bottom>
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
              <Button loading={loading} gradient onPress={handleLogin} style={{ borderRadius: SIZES.radius / 4 }}>
                <Text center white size={16}>
                  Login
                </Text>
              </Button>
            </Block>
          </Block>
          <Block flex={false} middle>
            <Text color={COLORS.gray} center>
              --- or ---
            </Text>
          </Block>
          <Block flex={false} row>
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
          <Block flex={false}>
            <AppleButton
              handleSignInSuccess={handleSigninSuccess}
              handleSigninError={handleSigninError}
              onTap={() => {
                setLoginError(false);
                setLoading(true);
              }}
            />
          </Block>
          <Block flex={false} top center middle>
            <Button raw onPress={handleRedirectToSignUp}>
              <Text>
                Create New Account <Text primary>Sign Up</Text>
              </Text>
            </Button>
          </Block>
        </Block>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  skipHolder: {
    position: 'absolute',
    top: SIZES.padding * 3,
    right: SIZES.padding,
    zIndex: 1,
  },
  textInput: {
    borderColor: COLORS.gray,
    borderWidth: 1,
    padding: SIZES.padding / 1.25,
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
