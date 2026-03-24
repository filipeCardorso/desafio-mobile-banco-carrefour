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
