const { expect } = require('chai');
const {Builder, By, Key, until} = require('selenium-webdriver');

describe('Acceptance Test', function () {
  it('should show search results after initiating a Google Search', async function () {
    // Allow the test up to ten seconds to run as loading Google might be slow on some networks
    this.timeout(10000);
    const driver = await new Builder()
    .forBrowser('chrome')
    .usingServer(`http://${process.env.SELENIUM_HOST}:4444/wd/hub`)
    .build();
    await driver.get('https://www.google.com/');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'));
    const pageTitle = await driver.getTitle();
    expect(pageTitle).to.equal('webdriver - Google Search');
    await driver.quit();
  });
})
