import { theme } from "@constants/index";
import React from "react";
import { StyleSheet } from "react-native";
import Block from "./Block";

const Divider = ({ style, ...props }) => <Block style={[styles.divider, style]} {...props} />;

export default Divider;

export const styles = StyleSheet.create({
	divider: {
		height: 0,
		borderBottomColor: theme.COLORS.gray2,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});
