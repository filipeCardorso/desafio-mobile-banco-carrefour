# Desafio Automacao Testes Mobile - Banco Carrefour

## Contexto

Desafio tecnico para vaga no Banco Carrefour. Automacao de testes mobile usando o app native-demo-app do WebDriverIO.

## Stack

- Linguagem: JavaScript
- Framework: WebDriverIO
- Biblioteca: Appium
- Gerenciador de testes: Mocha
- Asserts: Chai
- Relatorios: Allure Report
- CI/CD: GitLab CI/CD
- Cloud de dispositivos: BrowserStack
- Controle de versao: Git
- Gerenciador de pacotes: npm
- Appium: 2.x (com drivers uiautomator2 e xcuitest)
- Node: 20 (pinado via .nvmrc)
- Linting: ESLint + Prettier

## Estrutura do Projeto

```
desafio-mobile/
├── config/
│   ├── wdio.shared.conf.js
│   ├── wdio.android.conf.js
│   ├── wdio.ios.conf.js
│   └── wdio.browserstack.conf.js
├── app/
│   ├── android/
│   │   └── app-debug.apk
│   └── ios/
│       └── wdiodemoapp.app.zip
├── test/
│   ├── specs/
│   │   ├── login.spec.js
│   │   ├── signup.spec.js
│   │   ├── navigation.spec.js
│   │   ├── forms.spec.js
│   │   ├── swipe.spec.js
│   │   └── dragdrop.spec.js
│   ├── pageobjects/
│   │   ├── BasePage.js
│   │   ├── LoginPage.js
│   │   ├── SignupPage.js
│   │   ├── FormsPage.js
│   │   ├── SwipePage.js
│   │   ├── DragPage.js
│   │   └── NavigationBar.js
│   └── data/
│       ├── loginData.json
│       └── signupData.json
├── .gitlab-ci.yml
├── .github/
│   └── workflows/
│       └── test.yml
├── .eslintrc.json
├── .prettierrc
├── .nvmrc
├── .env.example
├── .gitignore
├── package.json
├── setup.js
└── README.md
```

## Arquitetura

### Configs

- `wdio.shared.conf.js`: config base compartilhada:
  - Framework: Mocha (timeout: 60s, `retries: 1` para resiliencia mobile)
  - Reporter: Allure com decorators (`addFeature`, `addSeverity`, `addStep`)
  - Service: `@wdio/appium-service` (sobe/desce Appium automaticamente)
  - Screenshots on failure via `afterTest` hook
  - Reset do app entre testes via `beforeEach` (`driver.reloadSession()`) para isolamento
  - Reporters: Allure + Spec (Allure para relatorio, Spec para output no terminal)
  - Timeouts: `waitforTimeout: 10000`, `connectionRetryTimeout: 30000`, `connectionRetryCount: 3`
  - Capability `appium:newCommandTimeout: 240` (evita timeout entre comandos mobile)
  - Log level: `info`
- `wdio.android.conf.js`: herda shared + capabilities Android (UiAutomator2, Pixel 7 API 34)
- `wdio.ios.conf.js`: herda shared + capabilities iOS (XCUITest, iPhone 15)
- `wdio.browserstack.conf.js`: herda shared + capabilities BrowserStack
  - Credenciais via env vars `BS_USER`, `BS_KEY`
  - App upload via `@browserstack/wdio-browserstack-service` (upload automatico do APK/IPA)
  - Devices: Samsung Galaxy S23 (Android 13), iPhone 14 (iOS 16)
  - Capability `app`: usa `bs://` hash retornado pelo upload

### Page Objects

Padrao Page Object com heranca de BasePage.

**BasePage.js** - metodos reutilizaveis:
- `waitForElement(element)` - wrapper com timeout padrao
- `tapElement(element)` - tap generico
- `getTextOf(element)` - retorna texto do elemento
- `isDisplayed(element)` - verifica visibilidade

**Page Objects especificos:**

| Page Object | Elementos | Acoes |
|-------------|-----------|-------|
| LoginPage | emailField, passwordField, loginButton, errorMessage | login(email, pass), getErrorMessage() |
| SignupPage | emailField, passwordField, confirmPasswordField, signupButton, errorMessage | signup(email, pass, confirm), getErrorMessage() |
| FormsPage | inputField, switchToggle, dropdown, dropdownOptions, activeButton | fillForm(text), toggleSwitch(), selectDropdown(value) |
| SwipePage | swipeContainer, cards, cardTitle | swipeLeft(), swipeRight(), getCurrentCardTitle() |
| DragPage | draggableItems, dropZones | dragTo(source, target), isDroppedCorrectly() |
| NavigationBar | homeTab, webviewTab, loginTab, formsTab, swipeTab, dragTab | navigateTo(tab), getCurrentTab() |

**Principios:**
- Selectors via getters do WebDriverIO
- Cada Page Object herda BasePage
- NavigationBar importado nos specs que navegam entre telas
- Prioridade: accessibility id (cross-platform), fallback xpath
- Selectors platform-specific quando necessario via helper:
  ```js
  get element() {
    return driver.isAndroid
      ? $('~android-accessibility-id')
      : $('~ios-accessibility-id');
  }
  ```

## 10 Cenarios de Teste

| # | Spec File | Cenario | Tipo |
|---|-----------|---------|------|
| 1 | login.spec.js | Login com credenciais validas | Data-driven (JSON) |
| 2 | login.spec.js | Login com credenciais invalidas | Data-driven (JSON) |
| 3 | login.spec.js | Login com campos vazios | Validacao de erro |
| 4 | signup.spec.js | Cadastro com sucesso | Data-driven (JSON) |
| 5 | signup.spec.js | Cadastro com senha invalida/fraca | Data-driven (JSON) |
| 6 | navigation.spec.js | Navegacao entre todas as tabs | Navegacao |
| 7 | forms.spec.js | Preenchimento com switch e dropdown | Formulario |
| 8 | forms.spec.js | Validacao de mensagens de erro no form | Validacao de erro |
| 9 | swipe.spec.js | Swipe horizontal entre cards | Interacao |
| 10 | dragdrop.spec.js | Drag and drop de elementos | Interacao |

## Data-Driven

Parametrizacao com JSON para Login e Signup.

**Nota:** As strings de erro esperadas (expectedError) devem ser verificadas contra o app real durante a implementacao. Os valores abaixo sao placeholders baseados no comportamento tipico do native-demo-app.

**loginData.json:**
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

O cenario de campos vazios (cenario 3) e um teste dedicado, nao faz parte do data-driven.

**signupData.json:**
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

## Evidencias

### Screenshots
- Captura automatica no `afterTest` hook do `wdio.shared.conf.js`
- Apenas quando o teste falha
- Salvos em `allure-results/` para inclusao automatica no Allure Report

### Allure Report
- Resumo dos testes executados (dashboard)
- Screenshots das falhas (anexados automaticamente)
- Logs de execucao (console output)
- Informacoes sobre o ambiente via `environment.properties`

### environment.properties
Gerado dinamicamente no `onComplete` hook do `wdio.shared.conf.js` com base nas capabilities ativas:
```
Platform=${capabilities.platformName}
Device=${capabilities['appium:deviceName']}
AppVersion=1.0.0
Node=${process.version}
WebDriverIO=9.x
```

## CI/CD - GitLab

Pipeline com 3 stages, executado automaticamente a cada commit ou merge request:

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
  script:
    - npm ci
  cache:
    paths:
      - node_modules/

test:android:
  stage: test
  tags:
    - android
  script:
    - emulator @Pixel_7_API_34 -no-window -no-audio &
    - adb wait-for-device
    - adb shell 'while [[ -z $(getprop sys.boot_completed) ]]; do sleep 1; done;'
    - npm run test:android
  artifacts:
    paths:
      - allure-results/

# iOS requer runner macOS - descomentar quando disponivel
# test:ios:
#   stage: test
#   tags:
#     - macos
#   script:
#     - npm run test:ios
#   artifacts:
#     paths:
#       - allure-results/

test:browserstack:
  stage: test
  script:
    - npm run test:browserstack
  variables:
    BS_USER: $BS_USER
    BS_KEY: $BS_KEY
  artifacts:
    paths:
      - allure-results/

pages:
  stage: report
  dependencies:
    - test:android
    - test:browserstack
  script:
    - npm run report:generate
    - mv allure-report public
  artifacts:
    paths:
      - public/
  when: always
```

### GitHub Actions (.github/workflows/test.yml)

Pipeline funcional no GitHub para o avaliador ver os testes rodando. Roda em push e pull request:

```yaml
name: Mobile Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17
      - name: Install dependencies
        run: npm ci
      - name: Start Android emulator and run tests
        uses: reactivecircus/android-emulator-runner@v2
        with:
          api-level: 34
          script: npm run test:android
      - name: Generate Allure Report
        if: always()
        run: npm run report:generate
      - name: Upload Allure Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-report
          path: allure-report/
```

**Estrategia:** `.gitlab-ci.yml` atende o requisito do desafio. GitHub Actions faz o pipeline rodar de verdade no repo de entrega.

## Scripts npm

```json
{
  "setup": "node setup.js",
  "test:android": "wdio run config/wdio.android.conf.js",
  "test:ios": "wdio run config/wdio.ios.conf.js",
  "test:browserstack": "wdio run config/wdio.browserstack.conf.js",
  "report:generate": "allure generate allure-results --clean",
  "report:open": "allure open allure-report",
  "lint": "eslint test/",
  "lint:fix": "eslint test/ --fix",
  "format": "prettier --write test/"
}
```

## Setup Script (setup.js)

Script automatizado para configurar o ambiente em um unico comando:
1. Instala Appium 2.x globalmente (se nao instalado)
2. Instala drivers: `appium driver install uiautomator2` + `appium driver install xcuitest`
3. Baixa o native-demo-app (APK + IPA) do GitHub releases do WebDriverIO para `app/`
4. Valida que Android SDK esta configurado (`ANDROID_HOME`)

Fluxo do avaliador: `npm install && npm run setup && npm run test:android`

## Qualidade de Codigo

### ESLint (.eslintrc.json)
Config minima para JavaScript:
- `eslint:recommended`
- Plugin `mocha` para boas praticas em testes
- Rules: `no-unused-vars: warn`, `no-console: off` (testes podem logar)

### Prettier (.prettierrc)
```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

### .nvmrc
```
20
```
Garante que qualquer dev use Node 20 via `nvm use`.

### .gitignore
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

### .env.example
```
BS_USER=your_browserstack_username
BS_KEY=your_browserstack_key
```

## Dependencias (package.json)

### devDependencies
```json
{
  "@wdio/cli": "^9.x",
  "@wdio/local-runner": "^9.x",
  "@wdio/mocha-framework": "^9.x",
  "@wdio/allure-reporter": "^9.x",
  "@wdio/spec-reporter": "^9.x",
  "@wdio/appium-service": "^9.x",
  "@browserstack/wdio-browserstack-service": "^8.x",
  "appium": "^2.x",
  "appium-uiautomator2-driver": "^3.x",
  "appium-xcuitest-driver": "^7.x",
  "chai": "^4.x",
  "allure-commandline": "^2.x",
  "eslint": "^8.x",
  "eslint-plugin-mocha": "^10.x",
  "prettier": "^3.x"
}
```

### Integracao do Chai
Chai e importado em cada spec via `const { expect } = require('chai')`. Usado para asserts legíveis:
```js
const { expect } = require('chai');
expect(await LoginPage.getErrorMessage()).to.equal('Invalid login credentials.');
```
O `expect` do Chai e usado em vez do `expect` nativo do WebDriverIO para asserts de valor/texto. O `expect` do WDIO e usado para asserts de elemento (`await expect(element).toBeDisplayed()`).

## README.md

Estrutura do README:
1. Sobre o Projeto
2. Pre-requisitos (Node.js, Java JDK, Android SDK, Xcode, Appium)
3. Configuracao do Ambiente (Android, iOS, BrowserStack)
4. Instalacao
5. Execucao dos Testes
6. Relatorios
7. Estrutura do Projeto
8. Cenarios de Teste
9. CI/CD

## Entrega

- Repositorio no **GitHub pessoal** (requisito do email da Opah IT)
- Prazo: **4 dias** (deadline: 28/03/2026)
- Enviar link do repo quando finalizar
- Local de desenvolvimento: /Users/filipegabriel/desafio-mobile
