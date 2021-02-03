import { Block, Divider } from "@components/index";
import { theme } from "@constants/index";
import React, { useEffect, useState } from "react";
import { FlatList, Share, StatusBar } from "react-native";
import Animated from "react-native-reanimated";
import DesignCard from "src/derivedComponents/Cards/DesignCard";

const { SIZES, COLORS } = theme;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const onShare = async (msg, slug) => {
	await Share.share({
		message: msg,
		title: "SPacejoy",
		url: slug,
	});
};

const Home = ({ navigation }) => {
	const [isLoading, setLoading] = useState(true);
	const [designFeed, setDesignFeed] = useState([]);

	const getDesignFeed = () =>
		fetch(`https://api-staging.spacejoy.com/api/designs/search/public?skip=${Math.random() * 10}&limit=100&sort=-1`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data: {} }),
		})
			.then((response) => response.json())
			.then((json) => setDesignFeed(json.data))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));

	useEffect(() => {
		getDesignFeed();
	}, []);

	return (
		<Block color="white" paddingHorizontal={SIZES.padding}>
			<StatusBar barStyle="dark-content" />
			<AnimatedFlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				refreshing={isLoading}
				onRefresh={getDesignFeed}
				data={designFeed.list}
				ItemSeparatorComponent={() => <Divider />}
				renderItem={({ item }) => <DesignCard data={item} navigation={navigation} />}
				keyExtractor={(item) => item._id}
			/>
		</Block>
	);
};

export default React.memo(Home);
