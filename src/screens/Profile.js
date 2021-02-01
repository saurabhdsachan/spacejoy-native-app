import { Block, Button, Text } from "@components/index";
import { theme } from "@constants/index";
import React from "react";
import { Image } from "react-native";

const { SIZES, COLORS } = theme;

const Profile = ({ navigation }) => {
	return (
		<Block middle center color={COLORS.gray}>
			<Image
				source={{
					uri:
						"https://media-exp1.licdn.com/dms/image/C5103AQGesJlA4slIRw/profile-displayphoto-shrink_400_400/0/1574104084714?e=1614816000&v=beta&t=WGahSsFe0iMtzaVYNSqbFROhw8hlga5PCh-45NMYm9k",
				}}
				resizeMode="cover"
				style={{
					height: 150,
					width: 150,
					borderRadius: 75,
					marginBottom: SIZES.padding / 2,
					borderColor: COLORS.transparent,
					borderWidth: 10,
				}}
			/>
			<Text h2 center mt2>
				Saurabh Sachan
			</Text>
			<Text body center mb4 mt1>
				saurabhdsachan@gmail.com
			</Text>
			<Button color={COLORS.black} onPress={() => navigation.goBack()}>
				<Text color={COLORS.white}>Back</Text>
			</Button>
		</Block>
	);
};

export default Profile;
