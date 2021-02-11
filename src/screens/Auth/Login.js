import AppleButton from '@components/AppleButton';
import Button from '@components/Button';
import FacebookLoginButton from '@components/FacebookLoginButton';
import GoogleLoginButton from '@components/GoogleLoginButton';
import { Block } from '@components/index';
import LoginError from '@components/LoginError';
import Text from '@components/Text';
import { COLORS, images, SIZES } from '@constants/index';
import { AuthContext } from '@utils/helpers/withAuthContext';
import { login, oAuthLogin } from '@utils/logins';
import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';

const { bg } = images;

const Login = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);

  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

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
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackground source={bg} style={styles.imageBg}>
        {loading && (
          <Block center middle color={COLORS.semiTransparent} style={{ ...StyleSheet.absoluteFill, zIndex: 1 }}>
            <ActivityIndicator size="small" />
          </Block>
        )}
        <Block flex={false} padding={[SIZES.height * 0.15, SIZES.padding * 2, 0, SIZES.padding * 2]}>
          <Text title mb1>
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
