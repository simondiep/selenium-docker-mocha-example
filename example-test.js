const { expect } = require('chai');
const {Builder, By, Key, until} = require('selenium-webdriver');

describe('Acceptance Test', function () {
  let driver;

  beforeEach(async function() {
    // Allow the test up to five seconds to run as loading Google might be slow on some networks
    this.timeout(5000);
    driver = await new Builder()
    .forBrowser('chrome')
    .usingServer(`http://${process.env.SELENIUM_HOST}:4444/wd/hub`)
    .build();
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      // Print out screenshot as base64
      const base64Screen = await driver.takeScreenshot();
      console.log('Failed test screenshot: ', base64Screen);
      console.log('Paste into https://codebeautify.org/base64-to-image-converter');

      // Print out the browser console
      const allLogs = await driver.manage().logs().get('browser');
      if (allLogs && allLogs.length) {
        console.log('### Begin Console Logs ###');
        console.log(allLogs);
        console.log('### End Console Logs ###');
      } else {
        console.log('### No Console Logs ###');
      }
    }
    await driver.quit();
  });

  it('should show search results after initiating a Google Search', async function () {
    // Allow the test up to ten seconds to run as loading Google might be slow on some networks
    this.timeout(10000);
    await driver.get('https://www.google.com/');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'));
    const pageTitle = await driver.getTitle();
    expect(pageTitle).to.equal('webdriver - Google Search');
  });
})
