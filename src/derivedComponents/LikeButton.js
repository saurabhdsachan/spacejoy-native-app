import { Button } from '@components/';
import { SIZES } from '@constants/';
import { designRoutes } from '@constants/routes';
import { fetcher, handle } from '@utils/apiFetcher';
import checkAuth from '@utils/helpers/checkAuth';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const LikeButton = ({ id, liked, onLikeChange, type, navigation, route }) => {
  const onLikeIconClick = async () => {
    const nextLikeStatus = !liked;
    const endPoint = designRoutes.getLikeApi(type, id);
    try {
      const [, likeErr] = await handle(
        fetcher({
          endPoint,
          method: nextLikeStatus ? 'POST' : 'DELETE',
          body: {},
        })
      );
      if (likeErr) {
        throw new Error();
      }
      onLikeChange(nextLikeStatus);
    } catch (e) {
      onLikeChange(nextLikeStatus);
    }
  };
  // checkAuth(navigation, { totalAmount }, undefined, 'PaymentScreen', route.name);
  return (
    <Button raw onPress={() => checkAuth(navigation, {}, onLikeIconClick, 'Home', route.name)}>
      <Icon name={`md-heart${liked ? '' : '-outline'}`} color={liked ? 'red' : 'black'} size={SIZES.base * 2.5} />
    </Button>
  );
};

export default LikeButton;
