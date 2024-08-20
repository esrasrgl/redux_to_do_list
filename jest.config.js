module.exports = {
  preset: "jest-expo",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|react-redux|redux|@reduxjs/toolkit)",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
