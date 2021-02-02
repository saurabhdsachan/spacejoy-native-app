const getDesignLikeApi = (id) => {
  return `/v1/designs/${id}/likes`;
};

const getUserBookmarks = () => {
  return '/v1/bookmarks';
};

const getBookmarkDesignMappingApi = (bookmarkId, designId) => {
  return `/v1/bookmarks/${bookmarkId}/designs/${designId}`;
};

export default {
  getDesignLikeApi,
  getUserBookmarks,
  getBookmarkDesignMappingApi,
};
