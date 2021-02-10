import { Block, Text } from '@components/index';
import { theme } from '@constants/index';
import React, { useRef } from 'react';
import { Image } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './Button';
import ProfileCard from './ProfileCard';

const { SIZES, COLORS } = theme;

const Avatar = ({ uri, user }) => {
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const renderNameAndImage = (
    <Block row>
      <Block flex={1}>
        <Button raw onPress={onOpen}>
          <Image
            source={{ uri }}
            resizeMode="cover"
            style={{
              height: 40,
              width: 40,
              borderRadius: 50,
            }}
          />
        </Button>
      </Block>
      <Block flex={4}>
        <Text h3>{user.name}</Text>
        <Text caption light>
          <Icon name="location-outline" size={12} /> {user.city}, {user.state}
        </Text>
      </Block>
    </Block>
  );
  return (
    <>
      {renderNameAndImage}
      <Portal>
        <Modalize modalTopOffset={SIZES.height * 0.6} ref={modalizeRef}>
          <ProfileCard user={user} uri={uri} />
        </Modalize>
      </Portal>
    </>
  );
};

export default Avatar;
