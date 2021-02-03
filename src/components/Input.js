import { theme } from "@constants/index";
import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import Block from "./Block";
import Button from "./Button";
import Text from "./Text";

export default class Input extends Component {
	state = {
		toggleSecure: false,
	};

	renderLabel() {
		const { label, error } = this.props;

		return (
			<Block flex={false}>
				{label ? (
					<Text black={!error} accent={error}>
						{label}
					</Text>
				) : null}
			</Block>
		);
	}

	renderToggle() {
		const { secure, rightLabel } = this.props;
		const { toggleSecure } = this.state;

		if (!secure) return null;

		return <Button style={styles.toggle} onPress={() => this.setState({ toggleSecure: !toggleSecure })} />;
	}

	renderRight() {
		const { rightLabel, rightStyle, onRightPress } = this.props;

		if (!rightLabel) return null;

		return (
			<Button style={[styles.toggle, rightStyle]} onPress={() => onRightPress && onRightPress()}>
				{rightLabel}
			</Button>
		);
	}

	render() {
		const { email, phone, number, secure, error, style, ...props } = this.props;

		const { toggleSecure } = this.state;
		const isSecure = toggleSecure ? false : secure;

		const inputStyles = [styles.input, error && { borderColor: theme.COLORS.accent }, style];

		const inputType = email ? "email-address" : number ? "numeric" : phone ? "phone-pad" : "default";

		return (
			<Block flex={false} margin={[theme.SIZES.base, 0]}>
				{this.renderLabel()}
				<TextInput
					style={inputStyles}
					secureTextEntry={isSecure}
					autoComplete="off"
					autoCapitalize="none"
					autoCorrect={false}
					keyboardType={inputType}
					{...props}
				/>
				{this.renderToggle()}
				{this.renderRight()}
			</Block>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: theme.COLORS.black,
		borderRadius: theme.SIZES.radius,
		fontSize: theme.SIZES.font,
		fontWeight: "500",
		color: theme.COLORS.black,
		height: theme.SIZES.base * 3,
	},
	toggle: {
		position: "absolute",
		alignItems: "flex-end",
		width: theme.SIZES.base * 2,
		height: theme.SIZES.base * 2,
		top: theme.SIZES.base,
		right: 0,
	},
});
