import { authRoutes } from '@constants/routes';
import { fetcher, handle } from '@utils/apiFetcher';

const oAuthLogin = async (user, token, provider, code = '') => {
  console.log('user pbj', user);
  try {
    const [oAuthRes, oAuthErr] = await handle(
      fetcher({
        endPoint: authRoutes.endPointSocialSignup,
        method: 'POST',
        body: {
          data: {
            provider,
            token,
            user,
            packet: null,
            ...(code && { code }),
          },
        },
      })
    );
    const { data, statusCode } = oAuthRes;
    if (statusCode <= 301 && !oAuthErr && data) {
      const { token: userToken, user: userInfo } = data;
      return { token: userToken, user: userInfo };
    } else {
      console.log('error');
      throw new Error('Something went wrong');
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (email, password) => {
  try {
    const [authRes, authErr] = await handle(
      fetcher({
        endPoint: routes.authRoutes.login,
        method: 'POST',
        body: {
          email,
          password,
          packet: null,
        },
      })
    );
    console.log('authRes, authErr', authRes, authErr);
    if (!authErr) {
      const { data, statusCode } = authRes;
      if (statusCode <= 301 && !authErr && data) {
        const { token: userToken, user: userInfo } = data;
        return { token: userToken, user: userInfo };
      } else {
        throw new Error('Something went wrong');
      }
    } else {
      throw new Error('Invalid username and password');
    }
  } catch (e) {
    console.log('e', e);
    throw new Error(e.message);
  }
};

export { oAuthLogin, login };
