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
    return this.getAlertText(['signed up', 'Sign up', 'sign up']);
  }

  async dismissAlert() {
    await this.dismissAlertByText('OK');
  }
}

module.exports = new SignupPage();
