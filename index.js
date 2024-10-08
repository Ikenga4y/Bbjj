const { chromium } = require('playwright');
const express = require('express');
const path = require('path');

// Create an Express app
const app = express();

// Define a route to serve the screenshot
app.get('/screenshot', (req, res) => {
  const screenshotPath = path.join(__dirname, 'sportybet_screenshot.png');
  res.download(screenshotPath); // This will prompt the browser to download the file
});

(async () => {
  // Launch a browser instance in headless mode
  const browser = await chromium.launch({ headless: true });

  // Create a new page in the browser
  const page = await browser.newPage();

  // Navigate to the login page of Sportybet
  await page.goto('https://www.sportybet.com/ng/m/#login');

  // Wait for the page to load
  await page.waitForTimeout(5000);  // Adjust the delay if necessary

  // Take a screenshot
  const screenshotPath = path.join(__dirname, 'sportybet_screenshot.png');
  await page.screenshot({ path: screenshotPath });

  // Close the browser
  await browser.close();

  console.log('Screenshot taken and saved!');

  // Start the Express server
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/screenshot');
  });
})();
