const playwright = require('playwright');
const assert = require('assert');

for (const browserName of ["chromium", "firefox", "webkit"]) {
  describe(`Web UI Tests with Playwright on ${browserName}`, async () => {
    let browser, page;
    before(async() => { browser = await playwright[browserName].launch({headless:false}); });
    after(async () => { await browser.close(); });
    beforeEach(async() => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });
    
    it('should open Wikipedia QA page', async () => {
      await page.goto('https://wikipedia.org/');
      await page.fill('#searchInput', 'QA');  
      await page.click('button[type="submit"]');  
      await page.screenshot({ path: `wikipedia.png` }); 
      assert.equal(await page.url(), 'https://en.wikipedia.org/wiki/QA');
    });
  });
}
