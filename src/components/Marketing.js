import { images, SIZES } from "@constants/index";
import React from "react";
import { Image, StyleSheet } from "react-native";
import Block from "./Block";
import Button from "./Button";
import Text from "./Text";

const Marketing = () => {
	return (
		<Block row center style={styles.shopThisLook}>
			<Block flex={2} padding={SIZES.padding}>
				<Text h2 mb1>
					Shop this Look
				</Text>
				<Text small mb2>
					Flat 10% OFF on Design Orders
				</Text>
				<Block row>
					<Button size="xs" color="black">
						<Text small color="white">
							BUY NOW
						</Text>
					</Button>
				</Block>
			</Block>
			<Block center middle>
				<Image
					source={images.offer}
					resizeMode="cover"
					style={{
						height: 60,
						width: 90,
					}}
				/>
			</Block>
		</Block>
	);
};

export default Marketing;

const styles = StyleSheet.create({
	shopThisLook: {
		backgroundColor: "#f8e7ff",
		marginVertical: SIZES.padding,
	},
});
