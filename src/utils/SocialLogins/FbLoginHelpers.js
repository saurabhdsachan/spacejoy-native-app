import { AccessToken, LoginManager, GraphRequestManager, GraphRequest } from "react-native-fbsdk";

const getInfoFromToken = async (token) => {
	const PROFILE_REQUEST_PARAMS = {
		fields: {
			string: "id,name,picture,email",
		},
	};
	return new Promise((resolve, reject) => {
		const profileRequest = new GraphRequest(
			"/me",
			{ token, parameters: { ...PROFILE_REQUEST_PARAMS } },
			(error, user) => {
				if (error) {
					reject(error);
				} else {
					const { name = "", id = "", email = "", picture: { data: { url = "" } = {} } = {} } = user;
					const userData = {
						data: {
							name,
							id,
							email,
							picture: url,
							channel: "facebook",
						},
						token,
					};
					resolve(userData);
				}
			}
		);
		new GraphRequestManager().addRequest(profileRequest).start();
	});
};
const fbLoginWrapper = () => {
	return new Promise((resolve, reject) => {
		LoginManager.logInWithPermissions(["public_profile", "email"]).then((login) => {
			if (login.isCancelled) {
				reject("Attempt to sign in was cancelled");
			} else {
				AccessToken.getCurrentAccessToken().then((data) => {
					const accessToken = data.accessToken.toString();
					resolve(accessToken);
				});
			}
		});
	});
};

export { getInfoFromToken, fbLoginWrapper };
