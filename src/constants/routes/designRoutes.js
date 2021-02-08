const getLikeApi = (type, id) => {
  return `/v1/${type}/${id}/likes`;
};

const getUserBookmarks = () => {
  return '/v1/bookmarks';
};

const getBookmarkMappingApi = (type, bookmarkId, id) => {
  if (type === 'design') {
    return `/v1/bookmarks/${bookmarkId}/designs/${id}`;
  }
  if (type === 'collection') {
    return `/v1/bookmarks/${bookmarkId}/collections/${id}`;
  }
  if (type === 'product') {
    return `/v1/bookmarks/${bookmarkId}/products/${id}`;
  }
};

export { getLikeApi, getUserBookmarks, getBookmarkMappingApi };
