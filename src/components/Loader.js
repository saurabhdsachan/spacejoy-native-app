import { SIZES } from "@constants/";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Block from "./Block";
import Text from "./Text";

const LovelyQuotes = [
	"Home is where love resides, memories are created, friends always belong, and laughter never ends",
	"Home is where our story begins…",
	"Home is the starting place of love, hope and dreams.",
	"The magic thing about home is that it feels good to leave, and it feels even better to come back.",
	"Home is not a place…it’s a feeling.",
	"There’s no place like home.",
	"The best journey takes you home.",
	"In this home… We do second chances. We do real. We do mistakes. We do I’m sorrys. We do loud really well. We do hugs. We do together best of all.",
	"The strength of a nation derives from the integrity of the home.",
	"Where thou art, that is home.",
];

const Loader = ({ style, textStyle, bgColor }) => {
	const loaderTextStyle = { ...styles.loaderText, ...textStyle };
	return (
		<Block style={styles.loaderWrapper} padding={SIZES.padding} color={bgColor}>
			<ActivityIndicator style={style} />
			<Text small mt2 textStyle center style={loaderTextStyle}>
				{LovelyQuotes[Math.floor(Math.random() * 10)]}
			</Text>
		</Block>
	);
};

const styles = StyleSheet.create({
	loaderWrapper: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	loaderText: {},
});

export default Loader;
