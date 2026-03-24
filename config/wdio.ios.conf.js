const path = require('path');
const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,

  capabilities: [
    {
      platformName: 'iOS',
      'appium:deviceName': 'iPhone 15',
      'appium:platformVersion': '17.0',
      'appium:automationName': 'XCUITest',
      'appium:app': path.join(process.cwd(), 'app', 'ios', 'wdiodemoapp.app.zip'),
      'appium:newCommandTimeout': 240,
      'appium:noReset': false,
    },
  ],
};
