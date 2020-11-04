const {Builder, By, Key, until} = require('selenium-webdriver');
require('dotenv').config();

(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        await driver.get('https://leetcode.com/accounts/login/');
        driver.executeScript(`document.getElementById('id_login').setAttribute('value', ${process.env.email})`);
        driver.executeScript(`document.getElementById('id_password').setAttribute('value', ${process.env.password})`);

        let loginBtn = driver.findElement(By.id("signin_btn"));
        driver.executeScript("arguments[0].click();",loginBtn);
    } catch (e) {
        console.log(e);
        await driver.quit();
    }
    finally {
        //await driver.quit();
    }
})();
