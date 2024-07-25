module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    testMatch: [
      '**/__tests__/SignInScreen.test.js',
      '**/__tests__/SignUpScreen.test.js',
    ],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
    ],
  };
  