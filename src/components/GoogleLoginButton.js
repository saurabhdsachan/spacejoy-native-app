import Button from "@components/Button";
import { theme } from "@constants/index";
import GSignIn from "@utils/SocialLogins/GoogleLoginHelpers";
import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const GoogleLoginButton = ({ handleSigninError, handleSignInSuccess, ...props }) => {
	const signInWithGoogle = async () => {
		props.onTap ? props.onTap() : () => {};
		try {
			const userData = await GSignIn();
			handleSignInSuccess(userData, userData.token);
		} catch (e) {
			handleSigninError(e.message);
		}
	};
	return (
		<Button size="sm" ghost style={styles.actionBtnStyles} onPress={signInWithGoogle} {...props}>
			<Icon color="#de5246" name="logo-google" size={18} />
		</Button>
	);
};

const styles = StyleSheet.create({
	actionBtnStyles: {
		textAlign: "center",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		borderRadius: theme.SIZES.base / 2,
	},
});
export default GoogleLoginButton;
