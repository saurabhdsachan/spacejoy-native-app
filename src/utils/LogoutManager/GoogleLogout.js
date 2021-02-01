import { GoogleSignin } from "@react-native-community/google-signin";

const signOut = async () => {
	try {
		await GoogleSignin.revokeAccess();
		await GoogleSignin.signOut();
	} catch (error) {
		console.error(error);
	}
};

export default signOut;
