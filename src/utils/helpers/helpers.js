import AsyncStorage from '@react-native-async-storage/async-storage';

const sortByKey = (array, key) => {
  return [...array].sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};
const initialState = {
  quiz1: {
    userDesignSelections: [],
  },
  quiz2: '',
  quiz3: '',
  quiz4: '',
  pricingData: [],
};
const clearStorageData = async () => {
  try {
    await AsyncStorage.setItem('userQuizResponse', JSON.stringify(initialState));
  } catch (e) {
    console.log('Error in clearing storage', e.message);
  }
};

export { sortByKey, clearStorageData };
