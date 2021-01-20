import AppleButton from '@components/AppleButton';
import Button from '@components/Button';
import FacebookLoginButton from '@components/FacebookLoginButton';
import GoogleLoginButton from '@components/GoogleLoginButton';
import {Block} from '@components/index';
import LoginError from '@components/LoginError';
import Text from '@components/Text';
import {COLORS, SIZES} from '@constants/index';
import {AuthContext} from '@utils/helpers/withAuthContext';
import {login, oAuthLogin} from '@utils/logins';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const {signIn} = React.useContext(AuthContext);

  const handleRedirectToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleSigninSuccess = async (userData = {}, token, authCode) => {
    // perform oAuth
    const {data: userInfo = {}} = userData;
    const {channel = ''} = userInfo;
    if (channel) {
      try {
        const {token: userToken} = await oAuthLogin(
          userInfo,
          token,
          channel,
          authCode,
        );
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
    //hide loader
    setLoading(false);
    //display error
    setLoginError(errorMessage);
  };

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const res = await login(email, password);
        if (res) {
          const {token, user} = res;
          const loginObj = {
            token,
            data: {...user},
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
      {loading && (
        <Block style={StyleSheet.absoluteFill}>
          <ActivityIndicator size="small" color={COLORS.primary1} />
        </Block>
      )}
      <Block padding={[SIZES.safe * 2, SIZES.padding, 0, SIZES.padding]}>
        <Text title mb4>
          Login
        </Text>
        {loginError && (
          <Block flex={1}>
            <LoginError errorText={loginError} />
          </Block>
        )}
        <Block flex={1}>
          <Block flex={false}>
            <TextInput
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
          <Button
            size="md"
            color={COLORS.black}
            onPress={handleLogin}
            style={{borderRadius: SIZES.radius / 4}}>
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text center white>
                Login
              </Text>
            )}
          </Button>
        </Block>
        <Block />
        <Block flex={0.5}>
          <Text center>-- or --</Text>
        </Block>
        <Block flex={0.5} row>
          <Block style={{marginRight: SIZES.padding}}>
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
        <Block flex={1}>
          <AppleButton
            handleSignInSuccess={handleSigninSuccess}
            handleSigninError={handleSigninError}
            onTap={() => {
              setLoginError(false);
              setLoading(true);
            }}
          />
        </Block>
        <Block flex={2} top center middle>
          <Button raw onPress={handleRedirectToSignUp}>
            <Text>
              Create New Account <Text primary>Sign Up</Text>{' '}
            </Text>
          </Button>
        </Block>
      </Block>
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
    marginBottom: SIZES.padding,
    height: SIZES.base * 6,
  },
});
export default Login;
