/* eslint-env node */
require('dotenv').config();

module.exports = {
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: process.env.IOS_DEBUG_BINARY_PATH,
      build: `cd ${process.env.APP_SOURCE_PATH} && yarn prebuild && yarn ios`,
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: process.env.IOS_RELEASE_BINARY_PATH,
      build: `cd ${process.env.APP_SOURCE_PATH} && yarn prebuild && yarn ios --configuration Release`,
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: process.env.ANDROID_DEBUG_BINARY_PATH,
      build: `cd ${process.env.APP_SOURCE_PATH} && yarn prebuild && yarn android`,
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: process.env.ANDROID_RELEASE_BINARY_PATH,
      build: `cd ${process.env.APP_SOURCE_PATH} && yarn prebuild && yarn android --variant=release`,
    },
  },
  devices: {
    'ios.sim.debug': {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14',
      },
    },
    'ios.sim.release': {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14',
      },
    },
    'android.emu.debug': {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_7_API_34',
      },
    },
    'android.emu.release': {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_7_API_34',
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'ios.sim.debug',
      app: 'ios.debug',
    },
    'ios.sim.release': {
      device: 'ios.sim.release',
      app: 'ios.release',
    },
    'android.emu.debug': {
      device: 'android.emu.debug',
      app: 'android.debug',
    },
    'android.emu.release': {
      device: 'android.emu.release',
      app: 'android.release',
    },
  },
};
