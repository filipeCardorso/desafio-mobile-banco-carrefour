const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

const ANDROID_APP_URL =
  'https://github.com/webdriverio/native-demo-app/releases/latest/download/Android-NativeDemoApp-0.4.0.apk';
const IOS_APP_URL =
  'https://github.com/webdriverio/native-demo-app/releases/latest/download/iOS-NativeDemoApp-0.4.0.app.zip';

function run(cmd, label) {
  console.log(`\n=> ${label}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed: ${label}`);
    process.exit(1);
  }
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      console.log(`  Already exists: ${dest}`);
      return resolve();
    }
    console.log(`  Downloading: ${path.basename(dest)}`);
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
      } else {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', reject);
  });
}

async function main() {
  console.log('=== Desafio Mobile - Setup ===\n');

  // 1. Check ANDROID_HOME
  if (!process.env.ANDROID_HOME) {
    console.warn('WARNING: ANDROID_HOME not set. Android emulator tests may not work.');
  } else {
    console.log(`ANDROID_HOME: ${process.env.ANDROID_HOME}`);
  }

  // 2. Install Appium drivers
  run('npx appium driver install uiautomator2 || true', 'Installing UiAutomator2 driver');
  run('npx appium driver install xcuitest || true', 'Installing XCUITest driver');

  // 3. Download apps
  console.log('\n=> Downloading native-demo-app...');
  fs.mkdirSync('app/android', { recursive: true });
  fs.mkdirSync('app/ios', { recursive: true });

  await download(ANDROID_APP_URL, 'app/android/app-debug.apk');
  await download(IOS_APP_URL, 'app/ios/wdiodemoapp.app.zip');

  console.log('\n=== Setup complete! ===');
  console.log('Run: npm run test:android');
}

main().catch(console.error);
