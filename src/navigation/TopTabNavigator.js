import { Block, Text } from "@components/";
import { COLORS, SIZES } from "@constants/";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Collection from "@screens/Collection";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useEffect } from "react/cjs/react.development";

const Tab = createMaterialTopTabNavigator();

function CustomTabRender({ state, descriptors, navigation }) {
	const focusedOptions = descriptors[state.routes[state.index].key].options;

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	return (
		<View style={{ color: COLORS.white }}>
			<ScrollView horizontal>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: route.name;

					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: "tabLongPress",
							target: route.key,
						});
					};

					return (
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
						>
							<Text
								bold={isFocused}
								style={{
									color: isFocused ? COLORS.primary2 : COLORS.black,
									...customTabRenderStyle.tabTitleText,
								}}
							>
								{label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
}

const customTabRenderStyle = StyleSheet.create({
	tabTitleText: {
		paddingVertical: SIZES.padding,
		paddingRight: SIZES.padding * 1.5,
	},
});

function CollectionTopTabNavigator({ navigation }) {
	const [searchMetaData, setSearchMetaData] = useState([]);
	useEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			headerVisible: false,
			headerStyle: {
				backgroundColor: "white",
				borderBottomColor: "white",
				shadowColor: "white",
			},
		});
		async function getSearchMeta() {
			await fetch("https://api.spacejoy.com/api/designs/search/public")
				.then((res) => res.json())
				.then((data) => setSearchMetaData(data.data))
				.catch((err) => console.error(err.message));
		}
		getSearchMeta();
		return () => {
			setSearchMetaData(null);
		};
	}, []);

	return (
		<Block padding={[0, SIZES.padding, 0, SIZES.padding]} color={COLORS.white}>
			<Text h1 mb2>
				Collection
			</Text>
			<Tab.Navigator
				tabBar={CustomTabRender}
				tabBarOptions={{
					style: { backgroundColor: COLORS.white },
					scrollEnabled: true,
					activeTintColor: COLORS.primary1,
					inactiveTintColor: "gray",
				}}
			>
				<Tab.Screen name="All" component={Collection} initialParams={{ roomType: "" }} />
				{/* {searchMetaData.find((item) => item.section === 'roomType').list.map()} */}
				{/* <Tab.Screen
          name="Living Room"
          component={Collection}
          initialParams={{roomType: 'living-room'}}
        /> */}
				{/* <Tab.Screen name="Bedroom" component={Collection} />
        <Tab.Screen name="What designs" component={Collection} />
        <Tab.Screen name="Why Designs" component={Collection} />
        <Tab.Screen name="omgdesigns" component={Collection} /> */}
			</Tab.Navigator>
		</Block>
	);
}

export default CollectionTopTabNavigator;
