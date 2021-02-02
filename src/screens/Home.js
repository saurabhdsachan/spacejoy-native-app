import Avatar from "@components/Avatar";
import { Block, Button, Divider, ProgressiveImage, Text } from "@components/index";
import { theme } from "@constants/index";
import React, { useEffect, useState } from "react";
import { FlatList, Share, StatusBar, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";

const { SIZES, COLORS } = theme;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const onShare = async (msg, slug) => {
	await Share.share({
		message: msg,
		title: "SPacejoy",
		url: slug,
	});
};

const Item = ({ data, navigation }) => (
	<Block color={COLORS.white} middle style={styles.designFeedCard} key={data._id}>
		<Block row center>
			<Block flex={3}>
				<Avatar
					uri="https://res.cloudinary.com/spacejoy/image/upload/c_thumb,g_face,fl_lossy,q_auto,f_auto,h_120,w_120/v1581506948/web/Customer%20Stories_Assets/Amber/Amber_profile_n4lpwa.jpg"
					user={{ name: "Amber Esperaza", city: "Austin", state: "Texas" }}
				/>
			</Block>
			<Block end flex={1}>
				<Button size="xs" onPress={() => navigation.navigate("Details", { feedItem: data })}>
					<Text center>
						<Icon name="basket-outline" size={20} />
					</Text>
				</Button>
			</Block>
		</Block>
		<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Details", { feedItem: data })}>
			<Block style={styles.designFeedImageHolder}>
				<ProgressiveImage
					source={{
						uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,h_${SIZES.height}/${data.cdnRender[0]}`,
					}}
					resizeMode="cover"
					style={styles.designFeedImage}
				/>
			</Block>
		</TouchableOpacity>
		<Block row paddingHorizontal={SIZES.padding / 2}>
			<Block>
				<Button raw onPress={() => onShare(data.name, data.slug)}>
					<Icon name="md-heart-outline" size={SIZES.base * 2.5} />
				</Button>
			</Block>
			<Block>
				<Button raw onPress={() => onShare(data.name, data.slug)}>
					<Icon name="share-social-outline" size={SIZES.base * 2.5} />
				</Button>
			</Block>
			<Block flex={4}>
				<Button raw>
					<Text small right>
						<Icon name="cube-outline" size={SIZES.base * 2.5} /> Try in 3D
					</Text>
				</Button>
			</Block>
		</Block>
		<Text h3 left mt2>
			{data.name}
		</Text>
		<Text left mt2 mb2 small>
			{data.name}
		</Text>
	</Block>
);

const Home = ({ navigation }) => {
	const [isLoading, setLoading] = useState(true);
	const [designFeed, setDesignFeed] = useState([]);

	const getDesignFeed = () =>
		fetch(`https://api.spacejoy.com/api/designs/search/public?skip=${Math.random() * 10}&limit=100&sort=-1`, {
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
				renderItem={({ item }) => <Item data={item} navigation={navigation} />}
				keyExtractor={(item) => item._id}
			/>
		</Block>
	);
};

export default React.memo(Home);

const styles = StyleSheet.create({
	designFeedCard: {
		paddingVertical: SIZES.padding,
	},
	designFeedImageHolder: {
		height: SIZES.height / 1.85,
		width: "100%",
		paddingVertical: SIZES.padding / 2,
	},
	designFeedImage: {
		borderRadius: SIZES.radius / 2,
		height: "100%",
		width: "100%",
	},
});
