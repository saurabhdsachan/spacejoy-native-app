const { Share } = require('react-native');
/**
 * @param shareProps Properties passes to share object
 * @param shareProps.data Data object containing inputs for the share application
 * @param shareProps.data.message Message to be shared
 * or
 * @param shareProps.data.url Url to item to be shared (ios)
 * @param shareProps.data.title Title of the shared item, appears on the sharesheet (android)
 * @param shareProps.onSuccess Callback to be called on completed
 * @param shareProps.onError Callback to be called on error (onluy)
 */
const onShare = async (props) => {
  const { data, onSuccess, onError } = props;

  try {
    const { message, title, url } = data;
    const result = await Share.share(
      {
        message,
        url,
        title,
        ...data,
      },
      { sharedAction: onSuccess }
    );
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};
export default onShare;
