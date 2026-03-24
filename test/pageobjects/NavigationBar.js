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
      const el = await this._getTabElement(name);
      const selected = await el.getAttribute('selected');
      if (selected === 'true') return name;
    }
    return null;
  }

  async isScreenLoaded(screenName) {
    const screenEl = await this.findByText(screenName, false);
    try {
      await screenEl.waitForDisplayed({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  _getTabElement(name) {
    const tabs = {
      home: this.homeTab,
      webview: this.webviewTab,
      login: this.loginTab,
      forms: this.formsTab,
      swipe: this.swipeTab,
      drag: this.dragTab,
    };
    return tabs[name];
  }
}

module.exports = new NavigationBar();
