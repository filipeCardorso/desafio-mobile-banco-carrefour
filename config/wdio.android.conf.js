const path = require('path');
const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,

  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'Medium_Phone_API_36.1',
      'appium:platformVersion': '16',
      'appium:automationName': 'UiAutomator2',
      'appium:app': path.join(process.cwd(), 'app', 'android', 'app-debug.apk'),
      'appium:newCommandTimeout': 240,
      'appium:noReset': false,
    },
  ],
};
