const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ANDROID_APP_URL =
  'https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk';
const IOS_APP_URL =
  'https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip';

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
  if (fs.existsSync(dest)) {
    const stats = fs.statSync(dest);
    if (stats.size > 1000) {
      console.log(`  Already exists: ${dest} (${(stats.size / 1024 / 1024).toFixed(1)}MB)`);
      return;
    }
    fs.unlinkSync(dest);
  }
  console.log(`  Downloading: ${path.basename(dest)}`);
  execSync(`curl -L -o "${dest}" "${url}"`, { stdio: 'inherit' });
}

function main() {
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

  download(ANDROID_APP_URL, 'app/android/app-debug.apk');
  download(IOS_APP_URL, 'app/ios/wdiodemoapp.app.zip');

  console.log('\n=== Setup complete! ===');
  console.log('Run: npm run test:android');
}

main();
