import { Block } from '@components/';
import AppleButton from '@components/AppleButton';
import Button from '@components/Button';
import FacebookLoginButton from '@components/FacebookLoginButton';
import GoogleLoginButton from '@components/GoogleLoginButton';
import LoginError from '@components/LoginError';
import Text from '@components/Text';
import { COLORS, images, SIZES } from '@constants/index';
import { authRoutes } from '@constants/routes';
import { fetcher, handle } from '@utils/apiFetcher';
import { AuthContext } from '@utils/helpers/withAuthContext';
import { oAuthLogin } from '@utils/logins';
import React, { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput } from 'react-native';

const { bg } = images;

const SignUp = ({ navigation, route }) => {
  const { signUp } = React.useContext(AuthContext);

  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, updateFirstName] = useState('');
  const [lastName, updateLastName] = useState('');
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [phone, updatePhone] = useState('');

  const handleRedirectToLogin = () => {
    const {
      params: { layout },
    } = route;
    navigation.navigate('Auth', { screen: 'Login', flow: 'login', layout });
  };

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
        signUp(localUserObject);
        setLoading(false);
        navigation.navigate('Home');
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

  const signUpUser = async () => {
    // validate form fields
    if (firstName && lastName && phone && password && email) {
      setLoading(true);
      // submit API call
      const endPoint = authRoutes.signUpRoute;
      const body = {
        data: {
          email,
          password,
          firstName,
          lastName,
          phone: parseInt(phone, 10),
          tnc: true,
          privacyPolicy: true,
          packet: null,
        },
      };
      try {
        const [signUpRes, signUpErr] = await handle(fetcher({ endPoint, body, method: 'POST' }));
        if (!signUpErr && signUpRes) {
          const { data: resData, statusCode } = signUpRes;

          if (statusCode <= 300 && resData) {
            const { token = '', user } = resData;
            const { name = '', email: userEmail = '', id = '', channel = 'email' } = user;
            const userData = {
              token,
              user: {
                name,
                email: userEmail,
                id,
                channel,
              },
            };
            signUp(userData);
          }
        } else {
          throw new Error();
        }
      } catch (e) {
        setLoading(false);
        setLoginError('An error occurred while signing up. Please try again');
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image source={bg} style={styles.imageBg} />
      <Block flex={false}>
        {loading && (
          <Block
            flex={false}
            center
            middle
            color={COLORS.semiTransparent}
            style={{ ...StyleSheet.absoluteFill, zIndex: 1 }}
          >
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
        <Block flex={false} padding={[50, SIZES.padding * 2, 0, SIZES.padding * 2]}>
          <Text h1 mb4>
            Signup
          </Text>
          {loginError && (
            <Block flex={false} marginBottom={SIZES.padding}>
              <LoginError errorText={loginError} />
            </Block>
          )}
          <Block flex={false}>
            <Block flex={false} row>
              <Block marginRight={SIZES.padding}>
                <TextInput
                  keyboardType="default"
                  placeholderTextColor={COLORS.gray}
                  style={styles.textInput}
                  placeholder="First Name"
                  onChangeText={(text) => updateFirstName(text)}
                  value={firstName}
                />
              </Block>
              <Block>
                <TextInput
                  keyboardType="default"
                  placeholderTextColor={COLORS.gray}
                  style={styles.textInput}
                  placeholder="Last Name"
                  onChangeText={(text) => updateLastName(text)}
                  value={lastName}
                />
              </Block>
            </Block>
            <Block flex={false}>
              <TextInput
                placeholderTextColor={COLORS.gray}
                style={styles.textInput}
                placeholder="Your password"
                secureTextEntry={true}
                onChangeText={(text) => updatePassword(text)}
                value={password}
              />
            </Block>
            <Block flex={false}>
              <TextInput
                keyboardType="email-address"
                placeholderTextColor={COLORS.gray}
                style={styles.textInput}
                placeholder="Your email"
                onChangeText={(text) => updateEmail(text)}
                value={email}
              />
            </Block>
            <Block flex={false}>
              <TextInput
                keyboardType="number-pad"
                placeholderTextColor={COLORS.gray}
                style={styles.textInput}
                placeholder="Your phone"
                onChangeText={(text) => updatePhone(text)}
                value={phone}
              />
            </Block>
            <Block flex={false}>
              <Button gradient onPress={signUpUser} style={{ borderRadius: SIZES.radius / 4 }}>
                {loading ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <Text center white size={16}>
                    Signup
                  </Text>
                )}
              </Button>
            </Block>
          </Block>

          <Block flex={false} middle marginVertical={SIZES.padding}>
            <Text color={COLORS.black} center>
              --- or ---
            </Text>
          </Block>
          <Block flex={false} row>
            <Block flex={1} style={{ marginRight: SIZES.padding }}>
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
          <Block flex={false} middle>
            <Text color="#6D7278" middle center>
              By signing up, you agree to our Terms and privacy policy
            </Text>
          </Block>
          <Block flex={false} top center middle paddingVertical={SIZES.base}>
            <Button raw onPress={handleRedirectToLogin}>
              <Text>
                Create New Account <Text primary>Login</Text>
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  skipHolder: {
    position: 'absolute',
    top: SIZES.padding * 3,
    right: SIZES.padding,
    zIndex: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  textInput: {
    borderColor: COLORS.gray,
    borderWidth: 1,
    padding: SIZES.padding / 1.25,
    borderRadius: SIZES.radius / 4,
    marginBottom: SIZES.padding,
  },
  imageBg: {
    ...StyleSheet.absoluteFillObject,
    right: 0,
    left: 'auto',
    height: 116,
    width: 300,
    resizeMode: 'contain',
  },
});
export default SignUp;
