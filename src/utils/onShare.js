const { Share } = require("react-native");
/**
 * @param shareProps Properties passes to share object
 * @param shareProps.data Data object containing inputs for the share application
 * @param shareProps.data.message Message to be shared
 * or
 * @param shareProps.data.url Url to item to be shared (ios)
 * @param shareProps.data.title Title of the shared item (android)
 * @param shareProps.onComplete Callback to be called on completed
 * @param shareProps.onError Callback to be called on error
 */
const onShare = async (props) => {
	const { data, onComplete, onError } = props;

	try {
		const { message, title, url } = data;
		const result = await Share.share({
			message,
			url,
			title,
			...data,
		});
		if (onComplete) {
			onComplete(result);
		}
	} catch (error) {
		if (onError) {
			onError(error);
		}
	}
};
export default onShare;
