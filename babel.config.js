module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining', {}],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@test': './__tests__',
          '@assets': './src/assets/',
          '@components': './src/components/',
          '@constants': './src/constants/',
          '@navigation': './src/navigation/',
          '@utils': './src/utils/',
          '@screens': './src/screens/',
          '@data': './src/data/'
        }
      }
    ]
  ]
};
