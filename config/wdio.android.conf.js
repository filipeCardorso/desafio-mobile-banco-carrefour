const path = require('path');
const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,

  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'Pixel_7_API_34',
      'appium:platformVersion': '14',
      'appium:automationName': 'UiAutomator2',
      'appium:app': path.join(process.cwd(), 'app', 'android', 'app-debug.apk'),
      'appium:newCommandTimeout': 240,
      'appium:noReset': false,
    },
  ],
};
