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
