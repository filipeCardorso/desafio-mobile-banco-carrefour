const path = require('path');
const { config } = require('./wdio.shared.conf');

exports.config = {
  ...config,

  user: process.env.BS_USER,
  key: process.env.BS_KEY,

  services: [
    [
      'browserstack',
      {
        app: path.join(process.cwd(), 'app', 'android', 'app-debug.apk'),
        buildIdentifier: '${BUILD_NUMBER}',
      },
    ],
  ],

  capabilities: [
    {
      platformName: 'Android',
      'bstack:options': {
        deviceName: 'Samsung Galaxy S23',
        osVersion: '13.0',
        buildName: 'Desafio Mobile Carrefour',
        sessionName: 'Android Tests',
      },
    },
    {
      platformName: 'iOS',
      'bstack:options': {
        deviceName: 'iPhone 14',
        osVersion: '16',
        buildName: 'Desafio Mobile Carrefour',
        sessionName: 'iOS Tests',
      },
    },
  ],
};
