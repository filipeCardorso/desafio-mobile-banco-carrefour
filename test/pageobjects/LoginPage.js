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

  async login(email, password) {
    await this.setValue(this.emailField, email);
    await this.setValue(this.passwordField, password);
    await this.tapElement(this.loginButton);
  }

  async getAlertMessage() {
    return this.getAlertText(['logged in', 'invalid', 'Invalid', 'Please']);
  }

  async dismissAlert() {
    await this.dismissAlertByText('OK');
  }

  async getValidationError(expectedText) {
    return this.findByText(expectedText, false);
  }
}

module.exports = new LoginPage();
