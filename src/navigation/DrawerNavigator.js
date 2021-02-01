import { DrawerContent } from "@components/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Demo from "@screens/Demo";
import WalkThrough from "@screens/WalkThrough";
import { AuthContext } from "@utils/helpers/withAuthContext";
import React from "react";
import { AuthStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
	const { token } = React.useContext(AuthContext);
	return (
		<Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
			<Drawer.Screen name="Demo" component={Demo} options={{ swipeEnabled: false }} />
			<Drawer.Screen name="WalkThrough" component={WalkThrough} options={{ swipeEnabled: false }} />
			{token ? (
				<Drawer.Screen name="Home" component={TabNavigator} />
			) : (
				<Drawer.Screen name="Home" component={AuthStackNavigator} options={{ swipeEnabled: false }} />
			)}
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
