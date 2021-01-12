const designsFeed = async () => {
  let response = await fetch('https://reactnative.dev/movies.json');
  let json = await response.json();
  console.log('json', json.movies);
  return json.movies;
};

export default designsFeed;
