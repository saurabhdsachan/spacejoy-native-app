import { Block, Button, Divider, Radio, Text } from '@components/';
import { COLORS, images, SIZES } from '@constants/';
import { designRoutes } from '@constants/routes';
import { fetcher, handle } from '@utils/apiFetcher';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateBookmarkSection = ({ onCreateBookmark, onCancel, type }) => {
  const [loading, setLoading] = useState(false);
  // ideabook creation
  const [newBookmarkName, setNewBookmarkName] = useState(null);
  const [error, setError] = useState({ error: false, errorMessage: '' });

  const textInputRef = useRef();

  const onNewBookmarkNameChange = (text) => {
    setError({ error: false, errorMessage: '' });
    setNewBookmarkName(text);
  };

  const onCreateButtonClick = async () => {
    if (!newBookmarkName) {
      setError({
        error: true,
        errorMessage: 'Name needs to be atleast of one character length',
      });
    }
    setLoading(true);
    const endPoint = designRoutes.getUserBookmarks();
    try {
      const [createdBookmark, errorCreatingBookmark] = await handle(
        fetcher({
          endPoint,
          method: 'POST',
          body: {
            name: newBookmarkName,
            type,
          },
        })
      );
      if (errorCreatingBookmark) {
        setError({
          error: true,
          errorMessage: 'Something went wrong. Try again later',
        });
      } else {
        setLoading(false);
        onCreateBookmark(createdBookmark.data);
        onCancel(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  // ideabook creation end

  return (
    <Block padding={[SIZES.padding, 0]}>
      <TextInput
        ref={textInputRef}
        value={newBookmarkName}
        onChangeText={onNewBookmarkNameChange}
        style={styles.textInput}
        placeholderTextColor={COLORS.gray}
        placeholder="Name your Ideabook"
      />
      {error.error && <Text style={styles.errorText}>{error.errorMessage}</Text>}
      <Block row>
        <Block margin={[0, SIZES.base, 0, 0]}>
          <Button ghost onPress={onCancel}>
            <Text align="center">Cancel</Text>
          </Button>
        </Block>
        <Block margin={[0, 0, 0, SIZES.base]}>
          <Button color="black" onPress={onCreateButtonClick} loading={loading.creatingBookmark}>
            <Text align="center" color="white">
              Create
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

const BookmarkModal = ({ selectedIdForBookmark, onClosed, onBookmarkChange, type, bookmarkId }) => {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [loading, setLoading] = useState({
    loadingBookmarks: false,
    savingBookmarks: false,
    creatingBookmark: false,
  });

  const mounted = useRef(true);

  const [fetchError, setFetchError] = useState(true);
  const [selectedBookmark, setSelectedBookMark] = useState(bookmarkId);

  const ref = useRef(null);

  useEffect(() => {
    if (selectedIdForBookmark) ref?.current?.open();
  }, [selectedIdForBookmark]);

  useEffect(() => {
    const getBookmarks = async () => {
      setLoading({
        loadingBookmarks: true,
        savingBookmarks: false,
        creatingBookmark: false,
      });
      const endPoint = designRoutes.getUserBookmarks(type);

      try {
        const [fetchedBookmarkList, error] = await handle(fetcher({ endPoint, method: 'GET' }));
        if (error) {
          console.log(error);
        } else {
          if (fetchedBookmarkList?.data?.length) {
            if (mounted.current) setBookmarkList(fetchedBookmarkList.data);
            else {
              if (mounted.current) {
                setBookmarkList([]);
                setFetchError(true);
              }
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
      if (mounted.current) {
        setLoading({
          loadingBookmarks: true,
          savingBookmarks: false,
          creatingBookmark: false,
        });
      }
    };
    getBookmarks();
    return () => {
      mounted.current = false;
    };
  }, [type]);

  const onCheck = (id) => {
    setBookmarkCreationMode(false);
    setError({
      error: false,
      errorMessage: '',
    });
    if (selectedBookmark !== id) {
      setSelectedBookMark(id);
    } else {
      setSelectedBookMark(null);
    }
  };

  const closedCallback = () => {
    if (onClosed) onClosed();
  };

  const onSaveClick = async () => {
    if (!selectedBookmark) {
      setError({
        error: true,
        errorMessage: 'Please select an Ideabook to add design',
      });
      return;
    }
    const endPoint = designRoutes.getBookmarkMappingApi(type, selectedBookmark, selectedIdForBookmark);
    setLoading({
      loadingBookmarks: false,
      savingBookmarks: true,
      creatingBookmark: false,
    });
    try {
      const [data, err] = await handle(fetcher({ endPoint, method: 'POST', body: {} }));
      if (err) {
        throw new Error(err.message);
      }
      if (data) {
        onBookmarkChange({ status: true, bookmarkId: selectedBookmark });
        ref?.current?.close();
      }
    } catch (e) {
      console.error(e);
    }
    setLoading({
      loadingBookmarks: false,
      savingBookmarks: false,
      creatingBookmark: false,
    });
  };

  // ideabook creation
  const [bookmarkCreationMode, setBookmarkCreationMode] = useState(false);
  const [error, setError] = useState({ error: false, errorMessage: '' });

  const createBookmarkModeToggle = () => {
    setBookmarkCreationMode(!bookmarkCreationMode);
  };

  // ideabook creation end
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
            <Block padding={[SIZES.base, 0, SIZES.padding, 0]} center>
              <Text h2 center>
                Save {type} to Ideabook
              </Text>
              <Divider style={styles.divider} />
            </Block>
          );
        },
        contentContainerStyle: {
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
        },
        refreshing: true,
        ListEmptyComponent: !fetchError ? (
          <Block center>
            {loading.loadingBookmarks ? (
              <ActivityIndicator />
            ) : (
              <Image source={images.offer} style={styles.emptyImage} />
            )}
            {loading.loadingBookmarks ? (
              <Text center small mt2>
                Fetching your Ideabook&apos;s. Hang tight!
              </Text>
            ) : (
              <>
                <Text center small mt2>
                  Looks like you don&apos;t have any Ideabook&apos;s created.{' '}
                </Text>
                <Text center small mb3 bold>
                  Create one now to save your {type}!
                </Text>
              </>
            )}
          </Block>
        ) : (
          <Block center>
            <Text center h1>
              Uh-Oh
            </Text>
            <Text center mt2 mb3>
              Failed to fetch your Ideabooks. Please try again later
            </Text>
          </Block>
        ),
        ListFooterComponent: (
          <>
            {bookmarkCreationMode ? (
              <CreateBookmarkSection
                type={type}
                onCancel={createBookmarkModeToggle}
                onCreateBookmark={(bookmark) => setBookmarkList([...bookmarkList, bookmark])}
              />
            ) : (
              <>
                {error.error && <Text style={styles.errorText}>{error.errorMessage}</Text>}
                <Block row padding={[SIZES.padding, 0]}>
                  <Block margin={[0, SIZES.base, 0, 0]}>
                    <Button size="sm" ghost onPress={createBookmarkModeToggle}>
                      <Text align="center">Add New Ideabook</Text>
                    </Button>
                  </Block>
                  <Block margin={[0, 0, 0, SIZES.base]}>
                    <Button size="sm" color="black" onPress={onSaveClick} loading={loading.savingBookmarks}>
                      <Text align="center" color="white" capitalize>
                        Save
                      </Text>
                    </Button>
                  </Block>
                </Block>
              </>
            )}
          </>
        ),
        ItemSeparatorComponent: () => <Divider />,
        keyExtractor: (item) => item?._id,
        renderItem: ({ item }) => {
          return (
            <Block key={item?._id} paddingVertical={SIZES.padding}>
              <Radio
                inline
                button={{
                  size: 22,
                  label: item?.name,
                  value: item?._id,
                  selected: selectedBookmark === item?._id,
                }}
                onChange={onCheck}
              />
            </Block>
          );
        },
      }}
    />
  );
};

const BookmarkButton = ({ id, bookmarked, onBookmarkChange, type, bookmarkId }) => {
  const [selectedIdForBookmark, setSelectedIdForBookmark] = useState('');
  const toggleBookmark = (designId) => {
    setSelectedIdForBookmark(designId);
  };

  return (
    <>
      <Button raw size="xs" onPress={() => toggleBookmark(id)}>
        <Text center>
          <Icon name={`bookmark${bookmarked ? '' : '-outline'}`} size={20} color={COLORS.black} />
        </Text>
      </Button>
      <Portal>
        <BookmarkModal
          type={type}
          onBookmarkChange={onBookmarkChange}
          selectedIdForBookmark={selectedIdForBookmark}
          onClosed={toggleBookmark}
          bookmarkId={bookmarkId}
        />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: COLORS.gray,
    borderWidth: 1,
    padding: SIZES.padding / 1.25,
    borderRadius: SIZES.radius / 6,
    marginBottom: SIZES.padding / 2,
  },
  emptyImage: { width: 100, height: 100, resizeMode: 'contain' },
  errorText: {
    color: 'red',
    paddingVertical: SIZES.base,
  },
  divider: {
    paddingTop: SIZES.padding,
    width: 50,
  },
});

export default React.memo(BookmarkButton);
