import { SIZES } from "@constants/";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "./Button";

const HeaderRight = () => {
	return (
		<Button raw>
			<Icon name="cart-outline" size={20} style={{ marginHorizontal: SIZES.padding }} />
		</Button>
	);
};

export default HeaderRight;
