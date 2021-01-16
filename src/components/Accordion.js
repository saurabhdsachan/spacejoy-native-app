import { COLORS, SIZES } from '@constants/';
import React, { Component } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Block from './Block';
import Text from './Text';

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <Block color={COLORS.border}>
        <TouchableOpacity onPress={() => this.toggleExpand()}>
          <Block
            row
            padding={[
              SIZES.padding,
              SIZES.padding * 2,
              SIZES.padding,
              SIZES.padding,
            ]}>
            <Text style={[styles.title]}>{this.props.title}</Text>
            <Icon
              name={
                this.state.expanded ? 'caret-up-outline' : 'caret-down-outline'
              }
              size={16}
              color={COLORS.black}
            />
          </Block>
        </TouchableOpacity>
        {this.state.expanded && (
          <Block padding={[SIZES.padding / 2]}>
            <Text small light align="justify" style={styles.descriptionStyle}>
              {`${this.props.description}`}
            </Text>
          </Block>
        )}
      </Block>
    );
  }

  onClick = (index) => {
    const temp = this.state.data.slice();
    temp[index].value = !temp[index].value;
    this.setState({data: temp});
  };

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  itemActive: {
    fontSize: 12,
    color: COLORS.green,
  },
  itemInActive: {
    fontSize: 12,
    color: COLORS.border,
  },
  btnActive: {
    borderColor: COLORS.green,
  },
  btnInActive: {
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: SIZES.padding / 2,
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.border,
  },
  childRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.GRAY,
  },
  parentHr: {
    height: 1,
    color: COLORS.white,
    width: '100%',
  },
  childHr: {
    height: 1,
    backgroundColor: COLORS.border,
    width: '100%',
  },
  colorActive: {
    borderColor: COLORS.green,
  },
  colorInActive: {
    borderColor: COLORS.border,
  },
});
