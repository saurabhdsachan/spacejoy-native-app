import { Block } from '@components/';
import AppleButton from '@components/AppleButton';
import Button from '@components/Button';
import FacebookLoginButton from '@components/FacebookLoginButton';
import GoogleLoginButton from '@components/GoogleLoginButton';
import SignupError from '@components/LoginError';
import { routes, theme } from '@constants/index';
import { fetcher, handle } from '@utils/apiFetcher';
import { AuthContext } from '@utils/helpers/withAuthContext';
import { oAuthLogin } from '@utils/logins';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const SignUp = () => {
  const { signUp } = React.useContext(AuthContext);

  const [loginError, setloginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, updateFirstName] = useState('');
  const [lastName, updateLastName] = useState('');
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [phone, updatePhone] = useState('');

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
        signUp(localUserObject);
      } catch (e) {
        setLoading(false);
        setloginError(e.message);
      }
    }
  };
  const handleSigninError = (errorMessage) => {
    // hide loader
    setLoading(false);
    // display error
    setloginError(errorMessage);
  };

  const signUpUser = async () => {
    // validate form fields
    if (firstName && lastName && phone && password && email) {
      setLoading(true);
      // submit API call
      const endPoint = routes.authRoutes.signUpRoute;
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
              data: {
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
        setloginError('An error occurred while signing up. Please try again');
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView>
        <Block padding={[0, theme.SIZES.base * 3]}>
          <View style={styles.formSectionView}>
            <Text style={styles.tickerText}>Sign Up</Text>
          </View>
          <View style={styles.formSectionView}>
            <View style={styles.siblingMargin}>
              <TextInput
                style={styles.textInput}
                placeholder="First Name"
                onChangeText={updateFirstName}
                value={firstName}
              />
            </View>
            <View style={styles.siblingMargin}>
              <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                onChangeText={updateLastName}
                value={lastName}
              />
            </View>
            <View style={styles.siblingMargin}>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={updatePassword}
              />
            </View>
            <View style={styles.siblingMargin}>
              <TextInput style={styles.textInput} placeholder="Email" onChangeText={updateEmail} value={email} />
            </View>
            <View style={styles.siblingMargin}>
              <TextInput style={styles.textInput} placeholder="Phone" onChangeText={updatePhone} value={phone} />
            </View>
          </View>
          <View style={styles.formSectionView}>
            <Button gradient style={{ borderRadius: theme.SIZES.base / 2 }} onPress={signUpUser}>
              <Text style={styles.btnTextStyle}>Sign Up</Text>
            </Button>
          </View>
          <View style={styles.formSectionView}>
            <View style={styles.separatorText}>
              <View style={styles.separatorTextFirst} />
              <View>
                <Text style={styles.separator}>OR</Text>
              </View>
              <View style={styles.separatorTextLast} />
            </View>
          </View>
          <View style={[styles.formSectionView, styles.flexSection]}>
            <View style={styles.flexedViewStyleLeft}>
              <GoogleLoginButton
                handleSignInSuccess={handleSigninSuccess}
                handleSigninError={handleSigninError}
                onTap={() => {
                  setloginError(false);
                  setLoading(true);
                }}
              />
            </View>
            <View style={styles.flexedViewStyleRight}>
              <FacebookLoginButton
                handleSignInSuccess={handleSigninSuccess}
                handleSigninError={handleSigninError}
                onTap={() => {
                  setloginError(false);
                  setLoading(true);
                }}
              />
            </View>
          </View>
          <View>
            <AppleButton
              handleSignInSuccess={handleSigninSuccess}
              handleSigninError={handleSigninError}
              onTap={() => {
                setloginError(false);
                setLoading(true);
              }}
            />
          </View>
          <View style={styles.footerText}>
            <Text style={styles.footerTextStyle}>By signing up, you agree to our Terms and service policy</Text>
          </View>
          {loginError && <SignupError errorText={loginError} />}
          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color={theme.COLORS.primary1} />
            </View>
          )}
        </Block>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  flexSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  footerText: {
    marginTop: theme.SIZES.base * 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTextStyle: {
    color: theme.COLORS.gray,
    textAlign: 'center',
    width: '70%',
  },
  flexedViewStyleLeft: {
    flex: 1,
    paddingRight: theme.SIZES.base,
  },
  flexedViewStyleRight: {
    flex: 1,
    paddingLeft: theme.SIZES.base,
  },
  actionBtnStyles: {
    borderRadius: 0,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  siblingMargin: {
    marginBottom: theme.SIZES.base * 2,
  },
  separator: {
    color: theme.COLORS.gray2,
    paddingLeft: 8,
    paddingRight: 8,
  },
  separatorTextLast: {
    borderWidth: 1,
    borderColor: theme.COLORS.gray2,
    width: theme.SIZES.base * 2,
    // paddingLeft: theme.SIZES.base,
  },
  separatorTextFirst: {
    borderWidth: 1,
    borderColor: theme.COLORS.gray2,
    width: theme.SIZES.base * 2,
    // paddingRight: theme.SIZES.base,
  },
  separatorText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextStyle: {
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  formSectionView: {
    marginTop: theme.SIZES.base * 3,
  },
  textInput: {
    borderColor: theme.COLORS.border,
    borderWidth: 2,
    height: 40,
    padding: theme.SIZES.textPadding,
    borderRadius: theme.SIZES.base / 2,
  },
  tickerText: {
    fontSize: 40,
    lineHeight: 40,
    textTransform: 'capitalize',
    fontWeight: '800',
  },
});
export default SignUp;
