![WebDriverIO](https://img.shields.io/badge/WebDriverIO_9-EA5906?style=flat-square&logo=webdriverio&logoColor=white)
![Appium](https://img.shields.io/badge/Appium_2-663399?style=flat-square&logo=appium&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=flat-square&logo=mocha&logoColor=white)
![Chai](https://img.shields.io/badge/Chai-A30701?style=flat-square&logo=chai&logoColor=white)
![Allure](https://img.shields.io/badge/Allure_Report-FF5722?style=flat-square&logo=allure&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![BrowserStack](https://img.shields.io/badge/BrowserStack-FF6C37?style=flat-square&logo=browserstack&logoColor=white)

# Desafio de Automacao de Testes Mobile - Banco Carrefour

Projeto de automacao de testes mobile utilizando o aplicativo [native-demo-app](https://github.com/webdriverio/native-demo-app) (v2.2.0) do WebDriverIO.

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
| ESLint | 8.x |
| Prettier | 3.x |

## Pre-requisitos

- [Node.js](https://nodejs.org/) v20+ (recomendado usar [nvm](https://github.com/nvm-sh/nvm))
- [Java JDK](https://adoptium.net/) 17+
- **Para Android:** [Android SDK](https://developer.android.com/studio) com um emulador configurado
  - Variavel de ambiente `ANDROID_HOME` configurada
  - Emulador AVD criado (qualquer device com API 30+)
- **Para iOS:** [Xcode](https://developer.apple.com/xcode/) 15+ (apenas macOS)
  - Simulador iOS configurado (ex: iPhone 15)

## Instalacao

```bash
# Clonar o repositorio
git clone https://github.com/filipeCardorso/desafio-mobile-banco-carrefour.git
cd desafio-mobile-banco-carrefour

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

# iOS (simulador deve estar disponivel - requer Xcode)
npm run test:ios

# BrowserStack (requer credenciais)
cp .env.example .env
# Editar .env com suas credenciais BS_USER e BS_KEY
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
├── config/
│   ├── wdio.shared.conf.js       # Config base (Mocha, Allure, Appium, hooks)
│   ├── wdio.android.conf.js      # Capabilities Android emulador
│   ├── wdio.ios.conf.js          # Capabilities iOS simulador
│   └── wdio.browserstack.conf.js # Capabilities BrowserStack (Android + iOS)
├── app/                          # APK/IPA (baixados via npm run setup)
│   ├── android/
│   └── ios/
├── test/
│   ├── specs/                    # Cenarios de teste
│   │   ├── login.spec.js         # Cenarios 1-3
│   │   ├── signup.spec.js        # Cenarios 4-5
│   │   ├── navigation.spec.js    # Cenario 6
│   │   ├── forms.spec.js         # Cenarios 7-8
│   │   ├── swipe.spec.js         # Cenario 9
│   │   └── dragdrop.spec.js      # Cenario 10
│   ├── pageobjects/              # Page Objects (POM)
│   │   ├── BasePage.js           # Classe base com helpers cross-platform
│   │   ├── LoginPage.js
│   │   ├── SignupPage.js
│   │   ├── FormsPage.js
│   │   ├── SwipePage.js
│   │   ├── DragPage.js
│   │   └── NavigationBar.js
│   └── data/                     # Dados para testes data-driven
│       ├── loginData.json
│       └── signupData.json
├── .gitlab-ci.yml                # Pipeline GitLab CI/CD
├── .github/workflows/test.yml    # Pipeline GitHub Actions
├── .eslintrc.json                # Configuracao ESLint
├── .prettierrc                   # Configuracao Prettier
├── .nvmrc                        # Versao do Node (20)
├── .env.example                  # Template credenciais BrowserStack
├── setup.js                      # Setup automatizado (Appium + app download)
├── package.json
└── README.md
```

## Cenarios de Teste

| # | Cenario | Spec | Tipo |
|---|---------|------|------|
| 1 | Login com credenciais validas | login.spec.js | Data-driven |
| 2 | Login com email invalido | login.spec.js | Data-driven / Validacao |
| 3 | Login com campos vazios | login.spec.js | Validacao de erro |
| 4 | Cadastro com sucesso | signup.spec.js | Data-driven |
| 5 | Cadastro com senha invalida | signup.spec.js | Data-driven |
| 6 | Navegacao entre todas as tabs | navigation.spec.js | Navegacao |
| 7 | Formulario com switch e dropdown | forms.spec.js | Formulario |
| 8 | Validacao de erros no formulario | forms.spec.js | Validacao de erro |
| 9 | Swipe horizontal entre cards | swipe.spec.js | Interacao |
| 10 | Drag and drop de elementos | dragdrop.spec.js | Interacao |

## CI/CD

### GitLab CI/CD
Pipeline com 3 stages executado a cada commit ou merge request:
1. **install** - Instala dependencias
2. **test** - Executa testes (Android + BrowserStack)
3. **report** - Gera e publica Allure Report via GitLab Pages

### GitHub Actions
Pipeline funcional que roda testes em emulador Android no runner `ubuntu-latest` com KVM. Allure Report disponivel como artefato do pipeline.

## Scripts Disponiveis

| Comando | Descricao |
|---------|-----------|
| `npm run setup` | Setup automatizado (Appium drivers + app download) |
| `npm run test:android` | Testes no emulador Android |
| `npm run test:ios` | Testes no simulador iOS |
| `npm run test:browserstack` | Testes no BrowserStack |
| `npm run report:generate` | Gerar Allure Report |
| `npm run report:open` | Abrir Allure Report no navegador |
| `npm run lint` | Verificar qualidade do codigo (ESLint) |
| `npm run format` | Formatar codigo (Prettier) |
