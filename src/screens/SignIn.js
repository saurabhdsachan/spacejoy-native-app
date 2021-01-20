import React, {useState} from 'react';
import {Block} from '@components/';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {theme} from '@constants/index';
import Button from '@components/Button';
import {AuthContext} from '../utils/helpers/withAuthContext';
import {login, oAuthLogin} from '@utils/logins';
import AppleButton from '@components/AppleButton';
import FacebookLoginButton from '@components/FacebookLoginButton';
import GoogleLoginButton from '@components/GoogleLoginButton';
import LoginError from '@components/LoginError';
// import Text from '@components/Text';

const SignInScreen = ({navigation}) => {
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loginError, setloginError] = useState(false);

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
        setloginError(e.message);
      }
    }
  };
  const handleSigninError = (errorMessage) => {
    //hide loader
    setLoading(false);
    //display error
    setloginError(errorMessage);
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
          setloginError('Incorrect username and password');
        }
      } catch (e) {
        setLoading(false);
        setloginError('Incorrect username and password');
      }
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Block padding={[0, theme.SIZES.base * 3]}>
        <View style={styles.formSectionView}>
          <Text style={styles.tickerText}>Login</Text>
        </View>
        <View style={styles.formSectionView}>
          <View style={styles.siblingMargin}>
            <TextInput
              style={styles.textInput}
              placeholder="Your email"
              onChangeText={(text) => setEmailAddress(text)}
            />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Your password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.formSectionView}>
          <Button
            gradient
            // color={theme.COLORS.black}
            style={{borderRadius: theme.SIZES.base / 2}}
            onPress={handleLogin}>
            <Text style={styles.btnTextStyle}>Login</Text>
          </Button>
        </View>
        <View
          style={[styles.siblingMargin, styles.flexSection, styles.alignItems]}>
          <Text style={{fontSize: theme.SIZES.body}}>Create New Account</Text>
          <TouchableOpacity
            onPress={handleRedirectToSignUp}
            style={styles.signUpBtn}>
            <Text style={styles.signUpBtnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formSectionView}>
          <View style={styles.separatorText}>
            <View style={styles.separatorTextFirst} />
            <View>
              <Text style={styles.separator}>Or</Text>
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
        {loginError && <LoginError errorText={loginError} />}
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color={theme.COLORS.primary1} />
          </View>
        )}
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  signUpBtnText: {
    color: theme.COLORS.primary1,
    fontSize: theme.SIZES.body,
  },
  signUpBtn: {
    marginLeft: theme.SIZES.base,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  alignItems: {
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  separatorTextLast: {
    borderWidth: 1,
    borderColor: theme.COLORS.gray2,
    width: theme.SIZES.base * 3,
    marginLeft: theme.SIZES.base,
  },
  separatorTextFirst: {
    borderWidth: 1,
    borderColor: theme.COLORS.gray2,
    width: theme.SIZES.base * 3,
    marginRight: theme.SIZES.base,
  },
  marginRightSpace: {
    marginRight: theme.SIZES.base,
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
    marginTop: theme.SIZES.base * 4,
  },
  textInput: {
    borderColor: theme.COLORS.border,
    borderWidth: 2,
    height: 40,
    paddingLeft: theme.SIZES.textPadding,
    paddingRight: theme.SIZES.textPadding,
    borderRadius: theme.SIZES.base / 2,
  },
  tickerText: {
    fontSize: 40,
    lineHeight: 40,
    textTransform: 'capitalize',
    fontWeight: '800',
  },
});
export default SignInScreen;
