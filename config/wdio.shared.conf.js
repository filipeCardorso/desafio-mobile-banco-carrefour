const path = require('path');
const fs = require('fs');

exports.config = {
  runner: 'local',
  specs: [path.join(__dirname, '..', 'test', 'specs', '**', '*.spec.js')],
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 30000,
  connectionRetryCount: 3,

  services: ['appium'],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    retries: 1,
  },

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  beforeEach: async function () {
    await driver.reloadSession();
  },

  afterTest: async function (test, context, { error, passed }) {
    if (!passed) {
      const screenshot = await browser.takeScreenshot();
      const allure = require('@wdio/allure-reporter').default;
      allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
    }
  },

  onComplete: function (exitCode, config, capabilities) {
    const envFile = path.join('allure-results', 'environment.properties');
    const cap = Array.isArray(capabilities) ? capabilities[0] : capabilities;
    const content = [
      `Platform=${cap.platformName || 'Unknown'}`,
      `Device=${cap['appium:deviceName'] || 'Unknown'}`,
      `AppVersion=0.4.0`,
      `Node=${process.version}`,
      `WebDriverIO=9.x`,
    ].join('\n');

    fs.mkdirSync('allure-results', { recursive: true });
    fs.writeFileSync(envFile, content);
  },
};
