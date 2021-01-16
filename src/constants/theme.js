import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  gray: '#9DA3B4',
  gray2: '#C5CCD6',
  primary1: '#F5296E',
  primary2: '#F39C12',
  accent: '#FA6496',
  secondary: '#F7B500',
  red: '#fa4a5b',
  yellow: '#FF9800',
  green: '#00C48C',
  blue: '#0682FE',
  teal: '#00BCD4',
  black: '#000000',
  white: '#FFFFFF',
  border: '#F2F2F2',
  transparent: 'rgba(255,255,255,0)',
};

export const SIZES = {
  // global sizes
  statusBar: 30,
  base: 8,
  font: 14,
  radius: 12,
  padding: 18,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  title: 20,
  header: 18,
  body: 16,
  small: 14,
  caption: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  header: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.header,
    lineHeight: 36,
  },
  title: {fontFamily: 'Roboto-Regular', fontSize: SIZES.title, lineHeight: 30},
  body: {fontFamily: 'Roboto-Regular', fontSize: SIZES.body, lineHeight: 22},
  small: {fontFamily: 'Roboto-Light', fontSize: SIZES.small, lineHeight: 20},
  caption: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.caption,
    lineHeight: 22,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
