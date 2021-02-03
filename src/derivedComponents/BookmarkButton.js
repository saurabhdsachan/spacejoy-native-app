import { Block, Button, Divider, Radio, Text } from '@components/';
import { COLORS, SIZES } from '@constants/';
import routes from '@constants/routes';
import { fetcher, handle } from '@utils/apiFetcher';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateBookmarkSection = ({onCreateBookmark, onCancel, type}) => {
  const [loading, setLoading] = useState(false);
  //ideabook creation
  const [newBookmarkName, setNewBookmarkName] = useState(null);
  const [error, setError] = useState({error: false, errorMessage: ''});

  const textInputRef = useRef();

  const onNewBookmarkNameChange = (text) => {
    setError({error: false, errorMessage: ''});
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
    const endPoint = routes.designRoutes.getUserBookmarks();
    try {
      const [createdBookmark, errorCreatingBookmark] = await handle(
        fetcher({
          endPoint,
          method: 'POST',
          body: {
            name: newBookmarkName,
            type,
          },
        }),
      );
      if (errorCreatingBookmark) {
        setError({
          error: true,
          errorMessage: 'Something went wrong. Try again later',
        });
      } else {
        onCreateBookmark(createdBookmark.data);
        onCancel(false);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  //ideabook creation end

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
      {error.error && (
        <Text style={styles.errorText}>{error.errorMessage}</Text>
      )}
      <Block row>
        <Block margin={[0, SIZES.base, 0, 0]}>
          <Button ghost onPress={onCancel}>
            <Text align="center">Cancel</Text>
          </Button>
        </Block>
        <Block margin={[0, 0, 0, SIZES.base]}>
          <Button
            color="black"
            onPress={onCreateButtonClick}
            loading={loading.creatingBookmark}>
            <Text align="center" color="white">
              Create
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

const BookmarkModal = ({
  selectedIdForBookmark,
  onClosed,
  onBookmarkChange,
  type,
}) => {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [loading, setLoading] = useState({
    loadingBookmarks: false,
    savingBookmarks: false,
    creatingBookmark: false,
  });
  const [selectedBookmark, setSelectedBookMark] = useState();

  const ref = useRef(null);

  useEffect(() => {
    if (selectedIdForBookmark) {
      ref?.current?.open();
    }
  }, [selectedIdForBookmark]);

  useEffect(() => {
    if(selectedIdForBookmark){
      const getDesignBookmarkDetails = () => {};
      getDesignBookmarkDetails();
    }
  }, [selectedIdForBookmark]);

  useEffect(() => {
    const getBookmarks = async () => {
      const endPoint = routes.designRoutes.getUserBookmarks(type);

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
    setSelectedBookMark(null);
    if (onClosed) {
      onClosed();
    }
  };

  const onSaveClick = async () => {
    if (!selectedBookmark) {
      setError({
        error: true,
        errorMessage: 'Please select an Ideabook to add design',
      });
      return;
    }
    const endPoint = routes.designRoutes.getBookmarkMappingApi(
      type,
      selectedBookmark,
      selectedIdForBookmark,
    );
    setLoading({
      loadingBookmarks: false,
      savingBookmarks: true,
      creatingBookmark: false,
    });
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
        onBookmarkChange(true);
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

  //ideabook creation
  const [bookmarkCreationMode, setBookmarkCreationMode] = useState(false);
  const [error, setError] = useState({error: false, errorMessage: ''});

  const createBookmarkModeToggle = () => {
    setBookmarkCreationMode(!bookmarkCreationMode);
  };

  //ideabook creation end
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
              <Text h2 align="center">
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
        ListFooterComponent: (
          <>
            {bookmarkCreationMode ? (
              <CreateBookmarkSection
                type={type}
                onCancel={createBookmarkModeToggle}
                onCreateBookmark={(bookmark) =>
                  setBookmarkList([...bookmarkList, bookmark])
                }
              />
            ) : (
              <>
                {error.error && (
                  <Text style={styles.errorText}>{error.errorMessage}</Text>
                )}
                <Block row padding={[SIZES.padding, 0]}>
                  <Block margin={[0, SIZES.base, 0, 0]}>
                    <Button ghost onPress={createBookmarkModeToggle}>
                      <Text align="center">Add New Ideabook</Text>
                    </Button>
                  </Block>
                  <Block margin={[0, 0, 0, SIZES.base]}>
                    <Button
                      color="black"
                      onPress={onSaveClick}
                      loading={loading.savingBookmarks}>
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
        keyExtractor: ({item}) => item?._id,
        renderItem: ({item}) => {
          return (
            <Radio
              key={item?._id}
              inline
              button={{
                label: item?.name,
                value: item?._id,
                selected: selectedBookmark === item?._id,
              }}
              onClick={onCheck}
            />
          );
        },
      }}
    />
  );
};

const BookmarkButton = ({id, bookmarked, onBookmarkChange, type}) => {
  const [selectedIdForBookmark, setSelectedIdForBookmark] = useState(null);

  const toggleBookmark = (id = null) => {
    setSelectedIdForBookmark(id);
  };

  return (
    <>
      <Button raw size="xs" onPress={() => toggleBookmark(id)}>
        <Text center>
          <Icon
            name={`bookmark${bookmarked ? '' : '-outline'}`}
            size={20}
            color={COLORS.black}
          />
        </Text>
      </Button>
      <Portal>
        <BookmarkModal
          type={type}
          onBookmarkChange={onBookmarkChange}
          selectedIdForBookmark={selectedIdForBookmark}
          onClosed={toggleBookmark}
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
