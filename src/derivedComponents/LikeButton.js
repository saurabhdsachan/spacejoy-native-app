import {Button} from '@components/';
import {SIZES} from '@constants/';
import routes from '@constants/routes';
import {fetcher, handle} from '@utils/apiFetcher';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const LikeButton = ({id, liked, onLikeChange, type}) => {
  const onLikeIconClick = async () => {
    const nextLikeStatus = !liked;
    console.log('nextLikeStatus', nextLikeStatus);
    const endPoint = routes.designRoutes.getLikeApi(type, id);
    try {
      const [, likeErr] = await handle(
        fetcher({
          endPoint,
          method: nextLikeStatus ? 'POST' : 'DELETE',
          body: {},
        }),
      );
      if (likeErr) {
        throw new Error();
      }
      onLikeChange(nextLikeStatus);
    } catch (e) {
      onLikeChange(nextLikeStatus);
    }
  };

  return (
    <Button raw onPress={onLikeIconClick}>
      <Icon
        name={`md-heart${liked ? '' : '-outline'}`}
        color={liked ? 'red' : 'black'}
        size={SIZES.base * 2.5}
      />
    </Button>
  );
};

export default LikeButton;
