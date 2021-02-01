import { LoginManager } from "react-native-fbsdk";

const fbLogout = () => {
	LoginManager.logOut();
};

export default fbLogout;
