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
