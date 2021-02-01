import { theme } from "@constants/";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const { SIZES, COLORS } = theme;

const Radio = ({ button, onClick, inline, bold }) => {
	const radioStyles = [styles.radioButton, inline && styles.inline];
	const labelStyles = [styles.label, inline && styles.labelInline];
	return (
		<View style={radioStyles}>
			<View
				style={[
					styles.radioButtonHolder,
					{
						height: button.size,
						width: button.size,
						borderColor: button.color,
					},
				]}
			>
				{button.selected ? (
					<View
						style={[
							styles.radioIcon,
							{
								height: button.size / 2,
								width: button.size / 2,
								backgroundColor: button.color,
							},
						]}
					/>
				) : null}
			</View>
			<Text style={[labelStyles, bold && styles.labelBold]}>{button.label}</Text>
		</View>
	);
};

export default Radio;

const styles = StyleSheet.create({
	radioButton: {
		marginBottom: SIZES.base / 2,
	},
	inline: {
		flexDirection: "row",
		alignItems: "center",
	},
	radioButtonHolder: {
		borderRadius: 50,
		borderWidth: 2,
		justifyContent: "center",
		alignItems: "center",
	},
	radioIcon: {
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	label: {
		fontSize: 16,
		marginTop: SIZES.base,
	},
	labelInline: {
		marginTop: 0,
		marginLeft: SIZES.base,
	},
	labelBold: {
		fontWeight: "bold",
	},
});
