import {
  Block,
  Button,
  Divider,
  ProgressiveImage,
  Radio,
  Text,
} from '@components/';
import Avatar from '@components/Avatar';
import {COLORS, routes, SIZES} from '@constants/';
import {fetcher, handle} from '@utils/apiFetcher';
import onShare from '@utils/onShare';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import Icon from 'react-native-vector-icons/Ionicons';

const BookmarkModal = ({selectedDesignForBookmark, onClosed, onBookmarked}) => {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [selectedBookmark, setSelectedBookMark] = useState();

  const ref = useRef(null);

  useEffect(() => {
    if (selectedDesignForBookmark) {
      ref?.current?.open();
    }
  }, [selectedDesignForBookmark]);

  useEffect(() => {
    const getDesignBookmarkDetails = () => {};
    getDesignBookmarkDetails();
  }, [selectedDesignForBookmark]);

  useEffect(() => {
    const getBookmarks = async () => {
      const endPoint = routes.designRoutes.getUserBookmarks();

      try {
        const [fetchedBookmarkList, error] = await handle(
          fetcher({endPoint, method: 'GET'}),
        );
        if (error) {
          throw new Error();
        } else {
          setBookmarkList(fetchedBookmarkList.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getBookmarks();
  }, []);

  const onCheck = (id) => {
    if (selectedBookmark !== id) {
      setSelectedBookMark(id);
    } else {
      setSelectedBookMark(null);
    }
  };

  const closedCallback = () => {
    setSelectedBookMark(null);
    if (onClosed) {
      onClosed();
    }
  };

  const onSaveClick = async () => {
    const endPoint = routes.designRoutes.getBookmarkDesignMappingApi(
      selectedBookmark,
      selectedDesignForBookmark,
    );

    try {
      console.log('endPoint', endPoint);
      const [data, err] = await handle(
        fetcher({endPoint, method: 'POST', body: {}}),
      );
      console.log('data, err', data, err);
      if (err) {
        throw new Error(err.message);
      }
      if (data) {
        onBookmarked(true);
        ref?.current?.close();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onBookmarkDelete = async (id) => {
    const endPoint = `${routes.designRoutes.getUserBookmarks()}/${id}`;

    try {
      const [data, err] = await handle(fetcher({endPoint, method: 'DELETE'}));
      if (err) {
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modalize
      ref={ref}
      modalTopOffset={100}
      onClosed={closedCallback}
      adjustToContentHeight={true}
      flatListProps={{
        data: bookmarkList,
        ListHeaderComponent: () => {
          return (
            <Block padding={[SIZES.padding, 0, SIZES.padding, 0]}>
              <Block row spaceBetween center>
                <Block>
                  <Text h2>Save to Ideabook</Text>
                </Block>
                <Block bottom right>
                  <Button raw>
                    <Text align="right">
                      <Icon name="ios-add" />
                      Add new Ideabook
                    </Text>
                  </Button>
                </Block>
              </Block>
            </Block>
          );
        },
        contentContainerStyle: {
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
        },
        ListFooterComponent: () => {
          return (
            <Block>
              <Block>
                <Button dashed style={{borderRadius: SIZES.radius / 2}}>
                  <Text align="center">
                    <Icon name="add" />
                    Add new Ideabook
                  </Text>
                </Button>
              </Block>
              <Block end padding={[SIZES.padding, 0]}>
                <Button
                  style={{borderRadius: SIZES.radius / 4}}
                  color={COLORS.blue}
                  onPress={onSaveClick}>
                  <Text color="white">Save</Text>
                </Button>
              </Block>
            </Block>
          );
        },
        keyExtractor: ({item}) => item?._id,
        renderItem: ({item}) => {
          return (
            <Block row center spaceBetween>
              <Block>
                <Radio
                  inline
                  button={{
                    label: item?.name,
                    value: item?._id,
                    selected: selectedBookmark === item?._id,
                  }}
                  onClick={onCheck}
                />
              </Block>
              <Block end>
                <Button>
                  <Icon name="trash-outline" size={SIZES.header} color="red" />
                </Button>
              </Block>
            </Block>
          );
        },
      }}
    />
    //   <Text>{JSON.stringify(bookmarkList, null, 1)}</Text>
    // </Modalize>
  );
};

const DesignCard = ({data: designDataProp, navigation, extra}) => {
  const [data, setData] = useState(designDataProp);

  const [modalVisible, setVisible] = useState(false);

  const [selectedDesignForBookmark, setSelectedDesignForBookmark] = useState(
    null,
  );

  const toggleBookmark = (id = null) => {
    setSelectedDesignForBookmark(id);
  };

  const onBookmarked = (value) => {
    setData({...data, bookmarked: value});
  };

  const onLikeIconClick = async () => {
    const nextLikeStatus = !data?.liked;
    setData({...data, liked: nextLikeStatus});

    const endPoint = routes.designRoutes.getDesignLikeApi(data?._id);
    try {
      const [likeRes, likeErr] = await handle(
        fetcher({
          endPoint,
          method: nextLikeStatus ? 'POST' : 'DELETE',
          body: {},
        }),
      );
      console.log('likeRes, likeErr', likeRes);
      if (likeErr) {
        throw new Error();
      }
    } catch (e) {
      setData({...data, liked: !nextLikeStatus});
    }
  };

  return (
    <Block
      color={COLORS.white}
      middle
      style={styles.designFeedCard}
      key={data._id}>
      <Block row center padding={[0, 0, SIZES.padding, 0]}>
        <Block flex={3}>
          <Avatar
            uri="https://res.cloudinary.com/spacejoy/image/upload/c_thumb,g_face,fl_lossy,q_auto,f_auto,h_120,w_120/v1581506948/web/Customer%20Stories_Assets/Amber/Amber_profile_n4lpwa.jpg"
            user={{name: 'Amber Esperaza', city: 'Austin', state: 'Texas'}}
          />
        </Block>

        <Block end flex={1}>
          {
            <Button size="xs" onPress={() => toggleBookmark(data?._id)}>
              <Text center>
                <Icon
                  name={`bookmark${data?.bookmarked ? '' : '-outline'}`}
                  size={20}
                  color={data?.bookmarked ? COLORS.black : COLORS.gray}
                />
              </Text>
            </Button>
          }
        </Block>
      </Block>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Details', {feedItem: data})}>
        <Block style={styles.designFeedImageHolder}>
          <ProgressiveImage
            source={{
              uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,w_800/${data.cdnRender[0]}`,
            }}
            resizeMode="cover"
            style={styles.designFeedImage}
          />
        </Block>
      </TouchableOpacity>
      <Block row padding={SIZES.padding / 2}>
        <Block>
          <Button raw onPress={onLikeIconClick}>
            <Icon
              name={`md-heart${data?.liked ? '' : '-outline'}`}
              color={data?.liked ? 'red' : 'black'}
              size={SIZES.base * 2.5}
            />
          </Button>
        </Block>
        <Block>
          <Button raw onPress={() => onShare(data.name, data.slug)}>
            <Icon name="share-social-outline" size={SIZES.base * 2.5} />
          </Button>
        </Block>
        <Block>
          <Button raw>
            <Icon name="cube-outline" size={SIZES.base * 2.5} />
          </Button>
        </Block>
        <Block flex={4}>
          <Button raw>
            <Text small right>
              <Icon name="ios-color-wand-outline" size={SIZES.base * 2.5} /> Try
              in my room
            </Text>
          </Button>
        </Block>
      </Block>
      <Text h3 left mt2>
        {data.name}
      </Text>
      <Text left mt2 mb4 small>
        {data.name}
      </Text>
      <Divider />
      <Portal>
        <BookmarkModal
          onBookmarked={onBookmarked}
          selectedDesignForBookmark={selectedDesignForBookmark}
          onClosed={toggleBookmark}
        />
      </Portal>
    </Block>
  );
};

const styles = StyleSheet.create({
  designFeedCard: {
    width: SIZES.width,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
  },
  designFeedImageHolder: {
    height: 220,
    width: '100%',
  },
  designFeedImage: {
    height: '100%',
    width: '100%',
  },
});

export default DesignCard;
