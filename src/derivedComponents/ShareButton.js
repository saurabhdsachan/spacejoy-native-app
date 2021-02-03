import {Button} from '@components/';
import {SIZES} from '@constants/';
import onShare from '@utils/onShare';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const ShareButton = ({message, url, title, onSuccess, onError}) => {
  const shareOptions = {data: {message, url, title}, onSuccess, onError};

  return (
    <Button raw onPress={() => onShare(shareOptions)}>
      <Icon name="share-social-outline" size={SIZES.base * 2.5} />
    </Button>
  );
};

export default ShareButton;
