import { Block, Button, Text } from '@components/index';
import { images, theme } from '@constants/index';
import { AuthContext } from '@utils/helpers/withAuthContext';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const { SIZES, COLORS } = theme;

const Profile = ({ navigation }) => {
  const { data } = React.useContext(AuthContext);
  const { name = '', email = '', picture = '', channel } = data;
  return (
    <Block middle center color={COLORS.white}>
      <Image source={images.onboarding1} resizeMode="cover" style={styles.designFeedImage} />
      <Image
        source={{ uri: picture || images.defaultAvatar }}
        resizeMode="cover"
        style={{
          height: 150,
          width: 150,
          borderRadius: 75,
          marginBottom: SIZES.padding / 2,
          borderColor: COLORS.transparent,
          borderWidth: 10,
        }}
      />
      <Text h2 center mt2>
        {name}
      </Text>
      <Text body center mb4 mt1>
        {email}
      </Text>
      <Button color={COLORS.black} onPress={() => navigation.goBack()}>
        <Text color={COLORS.white}>Back</Text>
      </Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  designFeedImage: {
    borderRadius: SIZES.radius / 2,
    height: '100%',
    width: '100%',
  },
});

export default Profile;
