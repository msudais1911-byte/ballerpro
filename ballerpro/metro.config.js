const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Ensure the project entry point is set correctly for Expo Router
config.projectRoot = __dirname;

module.exports = config;
