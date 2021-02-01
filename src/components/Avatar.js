import { Block, Text } from "@components/index";
import { theme } from "@constants/index";
import React from "react";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { SIZES, COLORS } = theme;

const Avatar = ({ uri, user }) => {
	return (
		<Block row>
			<Block flex={1}>
				<Image
					source={{ uri }}
					resizeMode="cover"
					style={{
						height: 40,
						width: 40,
						borderRadius: 50,
					}}
				/>
			</Block>
			<Block flex={4}>
				<Text h3>{user.name}</Text>
				<Text caption light>
					<Icon name="location-outline" size={12} /> {user.city}, {user.state}
				</Text>
			</Block>
		</Block>
	);
};

export default Avatar;
