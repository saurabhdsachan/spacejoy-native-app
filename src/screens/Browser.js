import { Block, Text } from '@components/';
import { COLORS } from '@constants/';
import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';

const Browser = ({ route, navigation }) => {
  const { data } = route.params;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text h3>{data.title}</Text>,
    });
  });
  return (
    <Block color={COLORS.white}>
      <WebView source={{ uri: data.uri }} />
    </Block>
  );
};

export default React.memo(Browser);
