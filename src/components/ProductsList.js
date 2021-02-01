import { theme } from "@constants/index";
import React from "react";
import { Image } from "react-native";
import Block from "./Block";
import Text from "./Text";

const { SIZES, COLORS } = theme;

const Item = ({ data: { asset } }) => (
	<Block center row margin={[SIZES.padding / 2, 0, SIZES.padding / 2, 0]}>
		<Block flex={1}>
			{asset.cdn && asset.cdn ? (
				<Block center middle>
					<Image
						source={{
							uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,w_200/${asset.cdn}`,
						}}
						resizeMode="contain"
						style={{
							height: 100,
							width: 100,
						}}
					/>
				</Block>
			) : (
				<Text>No Image</Text>
			)}
		</Block>
		<Block flex={2}>
			<Text caption mt2 color="gray">
				{asset.retailer}
			</Text>
			<Text body mb1>
				{asset.name}
			</Text>
			<Text small mb2>
				${asset.price}.00
			</Text>
		</Block>
	</Block>
);

const ProductsList = ({ data }) => {
	return (
		<Block>
			{data.map((product) => (
				<Item data={product} key={`product-item-${product.asset.id}`} />
			))}
		</Block>
	);
};

export default ProductsList;
