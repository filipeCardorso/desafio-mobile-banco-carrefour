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
    await driver.pause(1000);
    const msgElement = await $('//*[@text="You successfully signed up!"]');
    try {
      await msgElement.waitForDisplayed({ timeout: 5000 });
      return msgElement.getText();
    } catch {
      const anyAlert = await $('//android.widget.TextView[contains(@text,"sign") or contains(@text,"Sign")]');
      await anyAlert.waitForDisplayed({ timeout: 5000 });
      return anyAlert.getText();
    }
  }

  async dismissAlert() {
    const okButton = await $('//*[@text="OK"]');
    await okButton.waitForDisplayed({ timeout: 5000 });
    await okButton.click();
  }
}

module.exports = new SignupPage();
