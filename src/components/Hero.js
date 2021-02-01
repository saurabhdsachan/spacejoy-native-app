import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Block from "./Block";

const styles = StyleSheet.create({
	hero: {},
});

export default class Hero extends Component {
	render() {
		const { pageTheme, children } = this.props;
		return (
			<Block flex={false} {...this.props} style={{ ...styles.hero, backgroundColor: `${pageTheme}` }}>
				{children}
			</Block>
		);
	}
}
