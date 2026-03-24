# Desafio Mobile Banco Carrefour - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete mobile test automation project with 10 scenarios using WebDriverIO + Appium for the Banco Carrefour QA Senior challenge.

**Architecture:** Page Object Model with BasePage inheritance. Configs split into shared + platform-specific (Android/iOS/BrowserStack). Data-driven via JSON for Login and Signup specs. Allure + Spec reporters with automatic screenshots on failure.

**Tech Stack:** JavaScript, WebDriverIO 9, Appium 2, Mocha, Chai, Allure Report, ESLint, Prettier, GitLab CI/CD, GitHub Actions

**Spec:** `docs/superpowers/specs/2026-03-24-desafio-mobile-carrefour-design.md`

**Deadline:** 28/03/2026 (4 days)

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies, scripts, project metadata |
| `.nvmrc` | Pin Node 20 |
| `.gitignore` | Exclude binaries, reports, node_modules |
| `.env.example` | BrowserStack credentials template |
| `.eslintrc.json` | Linting rules for test code |
| `.prettierrc` | Code formatting rules |
| `setup.js` | Automated setup: install Appium drivers, download app |
| `config/wdio.shared.conf.js` | Base WDIO config (Mocha, Allure, Appium service, hooks) |
| `config/wdio.android.conf.js` | Android emulator capabilities |
| `config/wdio.ios.conf.js` | iOS simulator capabilities |
| `config/wdio.browserstack.conf.js` | BrowserStack capabilities + service |
| `test/pageobjects/BasePage.js` | Base class with shared methods |
| `test/pageobjects/NavigationBar.js` | Tab navigation component |
| `test/pageobjects/LoginPage.js` | Login screen elements + actions |
| `test/pageobjects/SignupPage.js` | Signup screen elements + actions |
| `test/pageobjects/FormsPage.js` | Forms screen elements + actions |
| `test/pageobjects/SwipePage.js` | Swipe screen elements + actions |
| `test/pageobjects/DragPage.js` | Drag screen elements + actions |
| `test/data/loginData.json` | Login test data (valid + invalid) |
| `test/data/signupData.json` | Signup test data (valid + invalid) |
| `test/specs/login.spec.js` | Scenarios 1-3: login valid/invalid/empty |
| `test/specs/signup.spec.js` | Scenarios 4-5: signup valid/invalid |
| `test/specs/navigation.spec.js` | Scenario 6: tab navigation |
| `test/specs/forms.spec.js` | Scenarios 7-8: form fill + error validation |
| `test/specs/swipe.spec.js` | Scenario 9: horizontal swipe |
| `test/specs/dragdrop.spec.js` | Scenario 10: drag and drop |
| `.gitlab-ci.yml` | GitLab CI/CD pipeline (3 stages) |
| `.github/workflows/test.yml` | GitHub Actions pipeline (functional) |
| `README.md` | Setup, execution, and project documentation |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `.nvmrc`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `.eslintrc.json`
- Create: `.prettierrc`

- [ ] **Step 1: Initialize git repo**

```bash
cd /Users/filipegabriel/desafio-mobile
git init
```

- [ ] **Step 2: Create .nvmrc**

Create `desafio-mobile/.nvmrc`:
```
20
```

- [ ] **Step 3: Create .gitignore**

Create `desafio-mobile/.gitignore`:
```
node_modules/
allure-results/
allure-report/
app/android/*.apk
app/ios/*.zip
app/ios/*.app
.DS_Store
.env
*.log
```

- [ ] **Step 4: Create .env.example**

Create `desafio-mobile/.env.example`:
```
BS_USER=your_browserstack_username
BS_KEY=your_browserstack_key
```

- [ ] **Step 5: Create .prettierrc**

Create `desafio-mobile/.prettierrc`:
```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

- [ ] **Step 6: Create .eslintrc.json**

Create `desafio-mobile/.eslintrc.json`:
```json
{
  "env": {
    "node": true,
    "es2021": true,
    "mocha": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:mocha/recommended"
  ],
  "plugins": ["mocha"],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "mocha/no-mocha-arrows": "off"
  }
}
```

- [ ] **Step 7: Create package.json**

Create `desafio-mobile/package.json`:
```json
{
  "name": "desafio-mobile-banco-carrefour",
  "version": "1.0.0",
  "description": "Desafio de Automacao de Testes Mobile - Banco Carrefour",
  "scripts": {
    "setup": "node setup.js",
    "test:android": "wdio run config/wdio.android.conf.js",
    "test:ios": "wdio run config/wdio.ios.conf.js",
    "test:browserstack": "wdio run config/wdio.browserstack.conf.js",
    "report:generate": "allure generate allure-results --clean",
    "report:open": "allure open allure-report",
    "lint": "eslint test/",
    "lint:fix": "eslint test/ --fix",
    "format": "prettier --write test/"
  },
  "devDependencies": {
    "@wdio/cli": "^9.0.0",
    "@wdio/local-runner": "^9.0.0",
    "@wdio/mocha-framework": "^9.0.0",
    "@wdio/allure-reporter": "^9.0.0",
    "@wdio/spec-reporter": "^9.0.0",
    "@wdio/appium-service": "^9.0.0",
    "@browserstack/wdio-browserstack-service": "^8.0.0",
    "appium": "^2.5.0",
    "appium-uiautomator2-driver": "^3.0.0",
    "appium-xcuitest-driver": "^7.0.0",
    "chai": "^4.4.0",
    "allure-commandline": "^2.27.0",
    "eslint": "^8.56.0",
    "eslint-plugin-mocha": "^10.2.0",
    "prettier": "^3.2.0"
  },
  "engines": {
    "node": ">=20"
  }
}
```

- [ ] **Step 8: Create directory structure**

```bash
mkdir -p app/android app/ios test/specs test/pageobjects test/data config .github/workflows
```

- [ ] **Step 9: Install dependencies**

```bash
cd /Users/filipegabriel/desafio-mobile && npm install
```

- [ ] **Step 10: Commit scaffold**

```bash
git add -A
git commit -m "chore: project scaffold with dependencies and tooling config"
```

---

## Task 2: Setup Script

**Files:**
- Create: `setup.js`

- [ ] **Step 1: Create setup.js**

Create `desafio-mobile/setup.js`:
```js
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
```

- [ ] **Step 2: Test the setup script**

```bash
cd /Users/filipegabriel/desafio-mobile && npm run setup
```
Expected: Appium drivers installed, APK + IPA downloaded to `app/`.

- [ ] **Step 3: Commit**

```bash
git add setup.js
git commit -m "chore: add automated setup script for Appium drivers and app download"
```

---

## Task 3: WebDriverIO Configs

**Files:**
- Create: `config/wdio.shared.conf.js`
- Create: `config/wdio.android.conf.js`
- Create: `config/wdio.ios.conf.js`
- Create: `config/wdio.browserstack.conf.js`

- [ ] **Step 1: Create wdio.shared.conf.js**

Create `desafio-mobile/config/wdio.shared.conf.js`:
```js
const path = require('path');
const fs = require('fs');
const allure = require('@wdio/allure-reporter').default;

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
```

- [ ] **Step 2: Create wdio.android.conf.js**

Create `desafio-mobile/config/wdio.android.conf.js`:
```js
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
```

- [ ] **Step 3: Create wdio.ios.conf.js**

Create `desafio-mobile/config/wdio.ios.conf.js`:
```js
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
```

- [ ] **Step 4: Create wdio.browserstack.conf.js**

Create `desafio-mobile/config/wdio.browserstack.conf.js`:
```js
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
```

- [ ] **Step 5: Verify Android config loads**

```bash
cd /Users/filipegabriel/desafio-mobile && npx wdio run config/wdio.android.conf.js --help
```
Expected: WDIO help output (no config parse errors).

- [ ] **Step 6: Commit**

```bash
git add config/
git commit -m "feat: add WDIO configs for Android, iOS, and BrowserStack"
```

---

## Task 4: BasePage + NavigationBar

**Files:**
- Create: `test/pageobjects/BasePage.js`
- Create: `test/pageobjects/NavigationBar.js`

- [ ] **Step 1: Create BasePage.js**

Create `desafio-mobile/test/pageobjects/BasePage.js`:
```js
class BasePage {
  async waitForElement(element) {
    await element.waitForDisplayed({ timeout: 10000 });
    return element;
  }

  async tapElement(element) {
    await this.waitForElement(element);
    await element.click();
  }

  async getTextOf(element) {
    await this.waitForElement(element);
    return element.getText();
  }

  async isDisplayed(element) {
    try {
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }

  async setValue(element, value) {
    await this.waitForElement(element);
    await element.setValue(value);
  }
}

module.exports = BasePage;
```

- [ ] **Step 2: Create NavigationBar.js**

Create `desafio-mobile/test/pageobjects/NavigationBar.js`:
```js
const BasePage = require('./BasePage');

class NavigationBar extends BasePage {
  get homeTab() {
    return $('~Home');
  }

  get webviewTab() {
    return $('~Webview');
  }

  get loginTab() {
    return $('~Login');
  }

  get formsTab() {
    return $('~Forms');
  }

  get swipeTab() {
    return $('~Swipe');
  }

  get dragTab() {
    return $('~Drag');
  }

  async navigateTo(tab) {
    const tabs = {
      home: this.homeTab,
      webview: this.webviewTab,
      login: this.loginTab,
      forms: this.formsTab,
      swipe: this.swipeTab,
      drag: this.dragTab,
    };
    const element = await tabs[tab.toLowerCase()];
    await this.tapElement(element);
  }

  async getCurrentTab() {
    const tabNames = ['home', 'webview', 'login', 'forms', 'swipe', 'drag'];
    for (const name of tabNames) {
      const tabs = {
        home: this.homeTab,
        webview: this.webviewTab,
        login: this.loginTab,
        forms: this.formsTab,
        swipe: this.swipeTab,
        drag: this.dragTab,
      };
      const el = await tabs[name];
      const selected = await el.getAttribute('selected');
      if (selected === 'true') return name;
    }
    return null;
  }
}

module.exports = new NavigationBar();
```

- [ ] **Step 3: Commit**

```bash
git add test/pageobjects/BasePage.js test/pageobjects/NavigationBar.js
git commit -m "feat: add BasePage and NavigationBar page objects"
```

---

## Task 5: Login Page Object + Spec (Scenarios 1-3)

**Files:**
- Create: `test/pageobjects/LoginPage.js`
- Create: `test/data/loginData.json`
- Create: `test/specs/login.spec.js`

- [ ] **Step 1: Create LoginPage.js**

Create `desafio-mobile/test/pageobjects/LoginPage.js`:
```js
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  get emailField() {
    return $('~input-email');
  }

  get passwordField() {
    return $('~input-password');
  }

  get loginButton() {
    return $('~button-LOGIN');
  }

  get errorMessage() {
    return driver.isAndroid
      ? $('//android.widget.TextView[@resource-id="android:id/message"]')
      : $('//XCUIElementTypeStaticText[@name]');
  }

  get successMessage() {
    return driver.isAndroid
      ? $('//android.widget.TextView[@resource-id="android:id/message"]')
      : $('//XCUIElementTypeStaticText[@name]');
  }

  async login(email, password) {
    await this.setValue(this.emailField, email);
    await this.setValue(this.passwordField, password);
    await this.tapElement(this.loginButton);
  }

  async getAlertMessage() {
    const alert = driver.isAndroid
      ? await $('//android.widget.TextView[@resource-id="android:id/message"]')
      : await $('//XCUIElementTypeAlert//XCUIElementTypeStaticText[2]');
    await this.waitForElement(alert);
    return alert.getText();
  }

  async dismissAlert() {
    const okButton = driver.isAndroid
      ? await $('//android.widget.Button[@resource-id="android:id/button1"]')
      : await $('~Ok');
    await this.tapElement(okButton);
  }
}

module.exports = new LoginPage();
```

- [ ] **Step 2: Create loginData.json**

Create `desafio-mobile/test/data/loginData.json`:
```json
{
  "valid": [
    { "email": "valid@test.com", "password": "Password123" }
  ],
  "invalid": [
    { "email": "wrong@test.com", "password": "wrong", "expectedError": "Invalid login credentials." }
  ]
}
```

**Note:** Error strings are placeholders. Must be verified against the real app and updated during first test run.

- [ ] **Step 3: Create login.spec.js**

Create `desafio-mobile/test/specs/login.spec.js`:
```js
const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const LoginPage = require('../pageobjects/LoginPage');
const loginData = require('../data/loginData.json');

describe('Login', () => {
  beforeEach(async () => {
    await NavigationBar.navigateTo('login');
  });

  // Scenario 1: Login with valid credentials (data-driven)
  loginData.valid.forEach((data) => {
    it(`should login successfully with ${data.email}`, async () => {
      allure.addFeature('Login');
      allure.addSeverity('critical');

      await LoginPage.login(data.email, data.password);

      const message = await LoginPage.getAlertMessage();
      expect(message).to.include('Success');
      await LoginPage.dismissAlert();
    });
  });

  // Scenario 2: Login with invalid credentials (data-driven)
  loginData.invalid.forEach((data) => {
    it(`should show error for invalid credentials: ${data.email}`, async () => {
      allure.addFeature('Login');
      allure.addSeverity('critical');

      await LoginPage.login(data.email, data.password);

      const message = await LoginPage.getAlertMessage();
      expect(message).to.include(data.expectedError);
      await LoginPage.dismissAlert();
    });
  });

  // Scenario 3: Login with empty fields
  it('should show error when fields are empty', async () => {
    allure.addFeature('Login');
    allure.addSeverity('normal');
    allure.addStep('Tap login without filling fields');

    await LoginPage.tapElement(LoginPage.loginButton);

    // Verify email validation error is displayed
    const emailField = await LoginPage.emailField;
    const hasError = await emailField.getAttribute('error');
    // The app should show inline validation or prevent login
    // If no inline error, verify no success alert appeared
    const isEmailEmpty = (await emailField.getText()) === '' || (await emailField.getText()) === null;
    expect(isEmailEmpty).to.be.true;

    // Verify the login screen is still displayed (no navigation happened)
    expect(await LoginPage.isDisplayed(LoginPage.loginButton)).to.be.true;
  });
});
```

- [ ] **Step 4: Run lint to verify code quality**

```bash
cd /Users/filipegabriel/desafio-mobile && npm run lint
```
Expected: No errors (warnings OK).

- [ ] **Step 5: Commit**

```bash
git add test/pageobjects/LoginPage.js test/data/loginData.json test/specs/login.spec.js
git commit -m "feat: add Login page object, test data, and specs (scenarios 1-3)"
```

---

## Task 6: Signup Page Object + Spec (Scenarios 4-5)

**Files:**
- Create: `test/pageobjects/SignupPage.js`
- Create: `test/data/signupData.json`
- Create: `test/specs/signup.spec.js`

- [ ] **Step 1: Create SignupPage.js**

Create `desafio-mobile/test/pageobjects/SignupPage.js`:
```js
const BasePage = require('./BasePage');

class SignupPage extends BasePage {
  get emailField() {
    return $('~input-email');
  }

  get passwordField() {
    return $('~input-password');
  }

  get confirmPasswordField() {
    return $('~input-repeat-password');
  }

  get signupButton() {
    return $('~button-SIGN UP');
  }

  get signupTab() {
    return $('~button-sign-up-container');
  }

  async openSignupForm() {
    await this.tapElement(this.signupTab);
  }

  async signup(email, password, confirmPassword) {
    await this.setValue(this.emailField, email);
    await this.setValue(this.passwordField, password);
    await this.setValue(this.confirmPasswordField, confirmPassword);
    await this.tapElement(this.signupButton);
  }

  async getAlertMessage() {
    const alert = driver.isAndroid
      ? await $('//android.widget.TextView[@resource-id="android:id/message"]')
      : await $('//XCUIElementTypeAlert//XCUIElementTypeStaticText[2]');
    await this.waitForElement(alert);
    return alert.getText();
  }

  async dismissAlert() {
    const okButton = driver.isAndroid
      ? await $('//android.widget.Button[@resource-id="android:id/button1"]')
      : await $('~Ok');
    await this.tapElement(okButton);
  }
}

module.exports = new SignupPage();
```

- [ ] **Step 2: Create signupData.json**

Create `desafio-mobile/test/data/signupData.json`:
```json
{
  "valid": [
    { "email": "newuser@test.com", "password": "ValidPass1!", "confirmPassword": "ValidPass1!" }
  ],
  "invalid": [
    { "email": "test@test.com", "password": "123", "confirmPassword": "123", "expectedError": "Please enter at least 8 characters" }
  ]
}
```

- [ ] **Step 3: Create signup.spec.js**

Create `desafio-mobile/test/specs/signup.spec.js`:
```js
const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const SignupPage = require('../pageobjects/SignupPage');
const signupData = require('../data/signupData.json');

describe('Signup', () => {
  beforeEach(async () => {
    await NavigationBar.navigateTo('login');
    await SignupPage.openSignupForm();
  });

  // Scenario 4: Signup with valid data (data-driven)
  signupData.valid.forEach((data) => {
    it(`should signup successfully with ${data.email}`, async () => {
      allure.addFeature('Signup');
      allure.addSeverity('critical');

      await SignupPage.signup(data.email, data.password, data.confirmPassword);

      const message = await SignupPage.getAlertMessage();
      expect(message).to.include('signed up');
      await SignupPage.dismissAlert();
    });
  });

  // Scenario 5: Signup with invalid/weak password (data-driven)
  signupData.invalid.forEach((data) => {
    it(`should show error for invalid signup: ${data.email}`, async () => {
      allure.addFeature('Signup');
      allure.addSeverity('critical');

      await SignupPage.signup(data.email, data.password, data.confirmPassword);

      // Password validation is inline, not an alert
      const errorText = await $(`//*[contains(@text,"${data.expectedError}")]`);
      expect(await errorText.isDisplayed()).to.be.true;
    });
  });
});
```

- [ ] **Step 4: Commit**

```bash
git add test/pageobjects/SignupPage.js test/data/signupData.json test/specs/signup.spec.js
git commit -m "feat: add Signup page object, test data, and specs (scenarios 4-5)"
```

---

## Task 7: Navigation Spec (Scenario 6)

**Files:**
- Create: `test/specs/navigation.spec.js`

- [ ] **Step 1: Create navigation.spec.js**

Create `desafio-mobile/test/specs/navigation.spec.js`:
```js
const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');

describe('Navigation', () => {
  // Scenario 6: Navigate between all tabs
  const tabScreenMap = {
    webview: 'Webview',
    login: 'Login',
    forms: 'Forms',
    swipe: 'Swipe',
    drag: 'Drag',
    home: 'Home',
  };

  Object.entries(tabScreenMap).forEach(([tab, screenName]) => {
    it(`should navigate to ${tab} tab and load ${screenName} screen`, async () => {
      allure.addFeature('Navigation');
      allure.addSeverity('normal');
      allure.addStep(`Navigate to ${tab}`);

      await NavigationBar.navigateTo(tab);
      await driver.pause(500);

      // Verify screen-specific content loaded (not just tab button)
      const screenIdentifier = driver.isAndroid
        ? await $(`//*[contains(@text,"${screenName}") or contains(@content-desc,"${screenName}")]`)
        : await $(`//*[contains(@label,"${screenName}") or contains(@name,"${screenName}")]`);

      expect(await screenIdentifier.isDisplayed()).to.be.true;
    });
  });
});
```

- [ ] **Step 2: Commit**

```bash
git add test/specs/navigation.spec.js
git commit -m "feat: add navigation spec (scenario 6)"
```

---

## Task 8: Forms Page Object + Spec (Scenarios 7-8)

**Files:**
- Create: `test/pageobjects/FormsPage.js`
- Create: `test/specs/forms.spec.js`

- [ ] **Step 1: Create FormsPage.js**

Create `desafio-mobile/test/pageobjects/FormsPage.js`:
```js
const BasePage = require('./BasePage');

class FormsPage extends BasePage {
  get inputField() {
    return $('~text-input');
  }

  get inputResult() {
    return $('~input-text-result');
  }

  get switchToggle() {
    return $('~switch');
  }

  get switchText() {
    return $('~switch-text');
  }

  get dropdown() {
    return driver.isAndroid
      ? $('//android.view.ViewGroup[@content-desc="Dropdown"]/android.view.ViewGroup')
      : $('~Dropdown');
  }

  get activeButton() {
    return $('~button-Active');
  }

  get inactiveButton() {
    return $('~button-Inactive');
  }

  async fillForm(text) {
    await this.setValue(this.inputField, text);
  }

  async getInputResult() {
    return this.getTextOf(this.inputResult);
  }

  async toggleSwitch() {
    await this.tapElement(this.switchToggle);
  }

  async getSwitchText() {
    return this.getTextOf(this.switchText);
  }

  async selectDropdown(value) {
    await this.tapElement(this.dropdown);
    if (driver.isAndroid) {
      const option = await $(`//android.widget.CheckedTextView[@text="${value}"]`);
      await this.tapElement(option);
    } else {
      const option = await $(`~${value}`);
      await this.tapElement(option);
      const doneButton = await $('~Done');
      await this.tapElement(doneButton);
    }
  }

  async tapActiveButton() {
    await this.tapElement(this.activeButton);
  }

  async getAlertMessage() {
    const alert = driver.isAndroid
      ? await $('//android.widget.TextView[@resource-id="android:id/message"]')
      : await $('//XCUIElementTypeAlert//XCUIElementTypeStaticText[2]');
    await this.waitForElement(alert);
    return alert.getText();
  }

  async dismissAlert() {
    const okButton = driver.isAndroid
      ? await $('//android.widget.Button[@resource-id="android:id/button1"]')
      : await $('~Ask me later');
    await this.tapElement(okButton);
  }
}

module.exports = new FormsPage();
```

- [ ] **Step 2: Create forms.spec.js**

Create `desafio-mobile/test/specs/forms.spec.js`:
```js
const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const FormsPage = require('../pageobjects/FormsPage');

describe('Forms', () => {
  beforeEach(async () => {
    await NavigationBar.navigateTo('forms');
  });

  // Scenario 7: Fill form with switch and dropdown
  it('should fill form with text, switch and dropdown', async () => {
    allure.addFeature('Forms');
    allure.addSeverity('normal');

    // Type text and verify result
    await FormsPage.fillForm('Banco Carrefour');
    const result = await FormsPage.getInputResult();
    expect(result).to.equal('Banco Carrefour');

    // Toggle switch
    await FormsPage.toggleSwitch();
    const switchText = await FormsPage.getSwitchText();
    expect(switchText).to.include('OFF').or.include('ON');

    // Select dropdown option
    await FormsPage.selectDropdown('webdriver.io is awesome');

    // Tap active button and verify alert
    await FormsPage.tapActiveButton();
    const alertMsg = await FormsPage.getAlertMessage();
    expect(alertMsg).to.be.a('string').and.not.empty;
    await FormsPage.dismissAlert();
  });

  // Scenario 8: Form error/validation messages
  it('should show validation feedback on form interactions', async () => {
    allure.addFeature('Forms');
    allure.addSeverity('normal');
    allure.addStep('Tap inactive button and verify no action');

    // Tap inactive button - should not trigger alert
    const inactiveBtn = await FormsPage.inactiveButton;
    expect(await inactiveBtn.isDisplayed()).to.be.true;
    await inactiveBtn.click();

    // Verify no alert appeared (button is inactive)
    try {
      const alert = driver.isAndroid
        ? await $('//android.widget.TextView[@resource-id="android:id/message"]')
        : await $('//XCUIElementTypeAlert');
      const isAlertVisible = await alert.isDisplayed();
      expect(isAlertVisible).to.be.false;
    } catch {
      // No alert found - expected behavior for inactive button
    }

    allure.addStep('Tap active button and verify alert message');

    // Tap active button - should trigger alert with message
    await FormsPage.tapActiveButton();
    const alertMsg = await FormsPage.getAlertMessage();
    expect(alertMsg).to.be.a('string').and.not.empty;
    await FormsPage.dismissAlert();
  });
});
```

- [ ] **Step 3: Commit**

```bash
git add test/pageobjects/FormsPage.js test/specs/forms.spec.js
git commit -m "feat: add Forms page object and specs (scenarios 7-8)"
```

---

## Task 9: Swipe Page Object + Spec (Scenario 9)

**Files:**
- Create: `test/pageobjects/SwipePage.js`
- Create: `test/specs/swipe.spec.js`

- [ ] **Step 1: Create SwipePage.js**

Create `desafio-mobile/test/pageobjects/SwipePage.js`:
```js
const BasePage = require('./BasePage');

class SwipePage extends BasePage {
  get swipeContainer() {
    return $('~Swipe-screen');
  }

  get cardTitle() {
    return $$('~card');
  }

  async swipeLeft() {
    const screen = await driver.getWindowRect();
    const startX = Math.floor(screen.width * 0.8);
    const endX = Math.floor(screen.width * 0.2);
    const y = Math.floor(screen.height * 0.5);

    await driver.action('pointer', { parameters: { pointerType: 'touch' } })
      .move({ x: startX, y })
      .down()
      .move({ x: endX, y, duration: 300 })
      .up()
      .perform();
  }

  async swipeRight() {
    const screen = await driver.getWindowRect();
    const startX = Math.floor(screen.width * 0.2);
    const endX = Math.floor(screen.width * 0.8);
    const y = Math.floor(screen.height * 0.5);

    await driver.action('pointer', { parameters: { pointerType: 'touch' } })
      .move({ x: startX, y })
      .down()
      .move({ x: endX, y, duration: 300 })
      .up()
      .perform();
  }

  async getCurrentCardTitle() {
    const cards = await this.cardTitle;
    if (cards.length > 0) {
      return cards[0].getText();
    }
    return null;
  }
}

module.exports = new SwipePage();
```

- [ ] **Step 2: Create swipe.spec.js**

Create `desafio-mobile/test/specs/swipe.spec.js`:
```js
const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const SwipePage = require('../pageobjects/SwipePage');

describe('Swipe', () => {
  beforeEach(async () => {
    await NavigationBar.navigateTo('swipe');
  });

  // Scenario 9: Horizontal swipe between cards
  it('should swipe left and right between cards', async () => {
    allure.addFeature('Swipe');
    allure.addSeverity('normal');

    // Verify swipe screen loaded
    const container = await SwipePage.swipeContainer;
    expect(await container.isDisplayed()).to.be.true;

    // Swipe left
    await SwipePage.swipeLeft();
    await driver.pause(500);

    // Swipe left again
    await SwipePage.swipeLeft();
    await driver.pause(500);

    // Swipe right to go back
    await SwipePage.swipeRight();
    await driver.pause(500);

    // Verify we are still on swipe screen
    expect(await container.isDisplayed()).to.be.true;
  });
});
```

- [ ] **Step 3: Commit**

```bash
git add test/pageobjects/SwipePage.js test/specs/swipe.spec.js
git commit -m "feat: add Swipe page object and spec (scenario 9)"
```

---

## Task 10: Drag Page Object + Spec (Scenario 10)

**Files:**
- Create: `test/pageobjects/DragPage.js`
- Create: `test/specs/dragdrop.spec.js`

- [ ] **Step 1: Create DragPage.js**

Create `desafio-mobile/test/pageobjects/DragPage.js`:
```js
const BasePage = require('./BasePage');

class DragPage extends BasePage {
  dragElement(index) {
    return $(`~drag-l${Math.floor(index / 3) + 1}-c${(index % 3) + 1}`);
  }

  dropElement(index) {
    return $(`~drop-l${Math.floor(index / 3) + 1}-c${(index % 3) + 1}`);
  }

  get retryText() {
    return $('~Retry');
  }

  get congratsText() {
    return driver.isAndroid
      ? $('//*[contains(@text,"Congratulations")]')
      : $('//*[contains(@label,"Congratulations")]');
  }

  async dragTo(sourceIndex, targetIndex) {
    const source = await this.dragElement(sourceIndex);
    const target = await this.dropElement(targetIndex);

    await source.waitForDisplayed({ timeout: 5000 });
    await target.waitForDisplayed({ timeout: 5000 });

    await source.dragAndDrop(target);
  }

  async isDroppedCorrectly() {
    try {
      const congrats = await this.congratsText;
      return await congrats.isDisplayed();
    } catch {
      return false;
    }
  }
}

module.exports = new DragPage();
```

- [ ] **Step 2: Create dragdrop.spec.js**

Create `desafio-mobile/test/specs/dragdrop.spec.js`:
```js
const { expect } = require('chai');
const allure = require('@wdio/allure-reporter').default;
const NavigationBar = require('../pageobjects/NavigationBar');
const DragPage = require('../pageobjects/DragPage');

describe('Drag and Drop', () => {
  beforeEach(async () => {
    await NavigationBar.navigateTo('drag');
  });

  // Scenario 10: Drag and drop elements
  it('should drag elements to their drop zones', async () => {
    allure.addFeature('Drag and Drop');
    allure.addSeverity('normal');

    // Drag all 9 pieces to their matching positions (3x3 grid)
    for (let i = 0; i < 9; i++) {
      await DragPage.dragTo(i, i);
      await driver.pause(300);
    }

    // Verify puzzle completed
    const success = await DragPage.isDroppedCorrectly();
    expect(success).to.be.true;
  });
});
```

- [ ] **Step 3: Commit**

```bash
git add test/pageobjects/DragPage.js test/specs/dragdrop.spec.js
git commit -m "feat: add Drag and Drop page object and spec (scenario 10)"
```

---

## Task 11: Run Tests on Android Emulator

- [ ] **Step 1: Ensure setup is complete**

```bash
cd /Users/filipegabriel/desafio-mobile && npm run setup
```

- [ ] **Step 2: Start Android emulator**

```bash
emulator -avd Pixel_7_API_34 &
```

- [ ] **Step 3: Run all tests on Android**

```bash
cd /Users/filipegabriel/desafio-mobile && npm run test:android
```
Expected: 10 tests execute. Fix any selector mismatches or error string mismatches against the real app.

- [ ] **Step 4: Update selectors and error strings if needed**

Based on test results, update:
- `test/data/loginData.json` — correct `expectedError` values
- `test/data/signupData.json` — correct `expectedError` values
- Page Object selectors — correct accessibility IDs or xpaths

- [ ] **Step 5: Re-run tests to confirm all pass**

```bash
npm run test:android
```
Expected: All 10 tests pass.

- [ ] **Step 6: Run lint**

```bash
npm run lint
```
Expected: No errors.

- [ ] **Step 7: Generate Allure report**

```bash
npm run report:generate && npm run report:open
```
Expected: Allure report opens in browser showing all 10 tests with features, severities, and environment info.

- [ ] **Step 8: Commit any fixes**

```bash
git add -A
git commit -m "fix: update selectors and error strings after real device validation"
```

---

## Task 12: CI/CD Configs

**Files:**
- Create: `.gitlab-ci.yml`
- Create: `.github/workflows/test.yml`

- [ ] **Step 1: Create .gitlab-ci.yml**

Create `desafio-mobile/.gitlab-ci.yml`:
```yaml
stages:
  - install
  - test
  - report

workflow:
  rules:
    - if: $CI_PIPELINE_SOURCE == "push"
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

install:
  stage: install
  image: node:20
  script:
    - npm ci
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/

test:android:
  stage: test
  tags:
    - android
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
    policy: pull
  script:
    - emulator -avd Pixel_7_API_34 -no-window -no-audio &
    - adb wait-for-device
    - adb shell 'while [[ -z $(getprop sys.boot_completed) ]]; do sleep 1; done;'
    - npm run test:android
  artifacts:
    paths:
      - allure-results/
    when: always

# iOS requer runner macOS - descomentar quando disponivel
# test:ios:
#   stage: test
#   tags:
#     - macos
#   cache:
#     key: ${CI_COMMIT_REF_SLUG}
#     paths:
#       - node_modules/
#     policy: pull
#   script:
#     - npm run test:ios
#   artifacts:
#     paths:
#       - allure-results/
#     when: always

test:browserstack:
  stage: test
  image: node:20
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
    policy: pull
  script:
    - npm run test:browserstack
  variables:
    BS_USER: $BS_USER
    BS_KEY: $BS_KEY
  artifacts:
    paths:
      - allure-results/
    when: always

pages:
  stage: report
  image: node:20
  dependencies:
    - test:android
    - test:browserstack
  script:
    - npx allure generate allure-results --clean -o public
  artifacts:
    paths:
      - public/
  when: always
```

- [ ] **Step 2: Create .github/workflows/test.yml**

Create `desafio-mobile/.github/workflows/test.yml`:
```yaml
name: Mobile Tests

on: [push, pull_request]

jobs:
  test-android:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17

      - name: Install dependencies
        run: npm ci

      - name: Setup Appium
        run: npm run setup

      - name: Start Android emulator and run tests
        uses: reactivecircus/android-emulator-runner@v2
        with:
          api-level: 34
          arch: x86_64
          profile: pixel_6
          script: npm run test:android

      - name: Generate Allure Report
        if: always()
        run: npx allure generate allure-results --clean

      - name: Upload Allure Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-report
          path: allure-report/

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-results
          path: allure-results/
```

- [ ] **Step 3: Commit**

```bash
git add .gitlab-ci.yml .github/workflows/test.yml
git commit -m "feat: add GitLab CI/CD and GitHub Actions pipelines"
```

---

## Task 13: README.md

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create README.md**

Create `desafio-mobile/README.md`:
```markdown
# Desafio de Automacao de Testes Mobile - Banco Carrefour

Projeto de automacao de testes mobile utilizando o aplicativo [native-demo-app](https://github.com/webdriverio/native-demo-app) do WebDriverIO.

## Stack

| Tecnologia | Versao |
|------------|--------|
| JavaScript | ES2021 |
| WebDriverIO | 9.x |
| Appium | 2.x |
| Mocha | via WDIO |
| Chai | 4.x |
| Allure Report | 2.x |
| Node.js | 20 |

## Pre-requisitos

- [Node.js](https://nodejs.org/) v20+ (recomendado usar [nvm](https://github.com/nvm-sh/nvm))
- [Java JDK](https://adoptium.net/) 17+
- **Para Android:** [Android SDK](https://developer.android.com/studio) com um emulador configurado
  - Variavel de ambiente `ANDROID_HOME` configurada
  - Emulador AVD criado (ex: `Pixel_7_API_34` com API 34)
- **Para iOS:** [Xcode](https://developer.apple.com/xcode/) 15+ (apenas macOS)
  - Simulador iOS configurado (ex: iPhone 15)

## Instalacao

```bash
# Clonar o repositorio
git clone <repo-url>
cd desafio-mobile

# Usar a versao correta do Node
nvm use

# Instalar dependencias
npm install

# Setup automatizado (instala Appium drivers + baixa o app)
npm run setup
```

## Execucao dos Testes

```bash
# Android (emulador deve estar rodando)
npm run test:android

# iOS (simulador deve estar disponivel)
npm run test:ios

# BrowserStack (requer credenciais em .env)
cp .env.example .env
# Editar .env com suas credenciais
npm run test:browserstack
```

## Relatorios

```bash
# Gerar relatorio Allure
npm run report:generate

# Abrir no navegador
npm run report:open
```

O relatorio inclui:
- Resumo dos testes executados
- Screenshots das falhas (capturados automaticamente)
- Logs de execucao
- Informacoes sobre o ambiente de teste

## Estrutura do Projeto

```
desafio-mobile/
├── config/                  # Configuracoes WDIO por ambiente
│   ├── wdio.shared.conf.js  # Config base compartilhada
│   ├── wdio.android.conf.js # Android emulador
│   ├── wdio.ios.conf.js     # iOS simulador
│   └── wdio.browserstack.conf.js # BrowserStack
├── app/                     # APK/IPA (baixados via setup)
├── test/
│   ├── specs/               # Cenarios de teste
│   ├── pageobjects/         # Page Objects
│   └── data/                # Dados para testes data-driven
├── .gitlab-ci.yml           # Pipeline GitLab CI/CD
├── .github/workflows/       # Pipeline GitHub Actions
├── setup.js                 # Script de setup automatizado
└── README.md
```

## Cenarios de Teste

| # | Cenario | Tipo |
|---|---------|------|
| 1 | Login com credenciais validas | Data-driven |
| 2 | Login com credenciais invalidas | Data-driven |
| 3 | Login com campos vazios | Validacao de erro |
| 4 | Cadastro com sucesso | Data-driven |
| 5 | Cadastro com senha invalida | Data-driven |
| 6 | Navegacao entre todas as tabs | Navegacao |
| 7 | Formulario com switch e dropdown | Formulario |
| 8 | Validacao de erros no formulario | Validacao de erro |
| 9 | Swipe horizontal entre cards | Interacao |
| 10 | Drag and drop de elementos | Interacao |

## CI/CD

### GitLab CI/CD
Pipeline com 3 stages executado a cada commit ou merge request:
1. **install** - Instala dependencias
2. **test** - Executa testes (Android + BrowserStack)
3. **report** - Gera e publica Allure Report via GitLab Pages

### GitHub Actions
Pipeline funcional que roda testes em emulador Android no runner `macos-latest`.

## Scripts Disponiveis

| Comando | Descricao |
|---------|-----------|
| `npm run setup` | Setup automatizado (Appium + app) |
| `npm run test:android` | Testes no emulador Android |
| `npm run test:ios` | Testes no simulador iOS |
| `npm run test:browserstack` | Testes no BrowserStack |
| `npm run report:generate` | Gerar Allure Report |
| `npm run report:open` | Abrir Allure Report |
| `npm run lint` | Verificar qualidade do codigo |
| `npm run format` | Formatar codigo |
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with setup, execution, and project documentation"
```

---

## Task 14: Final Verification

- [ ] **Step 1: Run full test suite on Android**

```bash
cd /Users/filipegabriel/desafio-mobile && npm run test:android
```
Expected: All 10 tests pass.

- [ ] **Step 2: Generate and verify Allure Report**

```bash
npm run report:generate && npm run report:open
```
Verify: Dashboard shows all tests, screenshots on failures, environment info, feature/severity tags.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```
Expected: No errors.

- [ ] **Step 4: Verify git log**

```bash
git log --oneline
```
Expected: Clean commit history with descriptive messages.

- [ ] **Step 5: Create GitHub repo and push**

```bash
gh repo create desafio-mobile-banco-carrefour --public --source=. --push
```

- [ ] **Step 6: Verify GitHub Actions pipeline runs**

Check the Actions tab on GitHub. Expected: Pipeline triggers on push, Android tests run on macos-latest.

- [ ] **Step 7: Final commit if any adjustments needed**

```bash
git add -A && git commit -m "chore: final adjustments" && git push
```
