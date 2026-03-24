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
