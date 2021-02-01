import { HeaderBack, HeaderLeft } from "@components/index";
import { createStackNavigator } from "@react-navigation/stack";
import Collection from "@screens/Collection";
import Details from "@screens/Details";
import SingleCollection from "@screens/SingleCollection";
import React from "react";

const Stack = createStackNavigator();

const ScreenHeaderOptions = {
	headerBackImage: () => <HeaderBack />,
	headerTransparent: false,
	headerBackTitleVisible: false,
	headerTitleAlign: "left",
	title: null,
	headerStyle: {
		backgroundColor: "white",
		borderBottomColor: "white",
		shadowColor: "transparent",
	},
};

const CollectionStackNavigator = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Collection"
				component={Collection}
				options={{
					...ScreenHeaderOptions,
					headerLeft: () => <HeaderLeft navigation={navigation} />,
				}}
			/>
			<Stack.Screen
				screenOptions={{ headerShown: false }}
				name="SingleCollection"
				component={SingleCollection}
				options={ScreenHeaderOptions}
			/>
			<Stack.Screen
				screenOptions={{ headerShown: false }}
				name="Details"
				component={Details}
				options={ScreenHeaderOptions}
			/>
		</Stack.Navigator>
	);
};

export default React.memo(CollectionStackNavigator);
