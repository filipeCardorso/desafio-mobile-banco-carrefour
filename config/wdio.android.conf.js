const path = require('path');
const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,

  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:automationName': 'UiAutomator2',
      'appium:app': path.join(process.cwd(), 'app', 'android', 'app-debug.apk'),
      'appium:newCommandTimeout': 240,
      'appium:appWaitDuration': 60000,
      'appium:androidInstallTimeout': 180000,
      'appium:noReset': false,
    },
  ],
};
