import AsyncStorage from '@react-native-async-storage/async-storage';

const baseApiUrl = 'https://api-staging.spacejoy.com/api';

const fetcher = async ({ endPoint, method, type = 'text', body }) => {
  const JWT = await AsyncStorage.getItem('userToken');
  const headers = {
    'Content-type': type === 'file' ? '' : 'application/json',
    ...(JWT && { Authorization: JWT }),
    'client-origin': 'com.spacejoy.spacejoyapp-infra',
  };
  const options =
    method === 'GET'
      ? {
          method,
          headers,
        }
      : {
          method,
          headers,
          body: JSON.stringify(body),
        };
  const finalAPIBaseUrl = baseApiUrl;
  const apiEndpoint = `${finalAPIBaseUrl}${endPoint}`;
  return fetch(apiEndpoint, options)
    .then(async (response) => {
      if (response.status) {
        try {
          if (response.status === 204) {
            return {
              statusCode: response.status,
              status: response.statusText,
            };
          }
          if (response.status === 401) {
            throw new Error();
          }
          if (response.status !== 401 && response.status !== 204) {
            const resData = await response.json();
            if (resData.statusCode) {
              return resData;
            }
            return { data: resData, statusCode: response.status };
          }
        } catch (error) {
          throw new Error(error.message);
        }
      }
    })
    .catch((err) => {
      console.log('in this error', err);
      throw new Error(err.message);
    });
};
// [a,e]
const handle = (promise) => {
  return promise.then((data) => [data, undefined]).catch((err) => Promise.resolve([undefined, err]));
};

export { handle, fetcher };
