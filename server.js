const {Builder, By, Key, until} = require('selenium-webdriver');
require('dotenv').config();

function array_diff(a, b) {
    return a.filter(function(value) {
        return (b.indexOf(value) === -1);
    });
}

(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        //sign in to leetcode
        await driver.get('https://leetcode.com/accounts/login/'); //Go to leetcode sign in page
        await driver.findElement(By.id("id_login")).sendKeys(`${process.env.email}`); // Let bot enter your email
        await driver.findElement(By.id("id_password")).sendKeys(`${process.env.password}`); // Let bot enter your password
        let loginBtn = await driver.findElement(By.id("signin_btn")); // find sign in button
        await driver.executeScript("arguments[0].click();",loginBtn); // click on sign in button
        setTimeout(async function () {
            await driver.get('https://leetcode.com/problemset/all/');
            let sortBtn = await driver.findElement(By.xpath('//*[@id="question-app"]/div/div[2]/div[2]/div[2]/table/thead/tr/th[1]'));
            await driver.executeScript("arguments[0].click();",sortBtn);
            await driver.executeScript("arguments[0].click();",sortBtn);
            await driver.findElement(By.css('#question-app > div > div:nth-child(2) > div.question-list-base > div.table-responsive.question-list-table > table > tbody.reactable-pagination > tr > td > span.row-selector > select > option:nth-child(4)')).click();
            let questions = await driver.findElements(By.tagName('tr'));
            questions.shift();
            questions.pop();
            // console.log(questions);
            let solvedQuestions=[];
            for (const question of questions) {
                let td = await question.findElement(By.css(`td:nth-child(1)`));
                if(await td.getAttribute('value') === 'ac') {
                    let aTag = await question.findElement(By.tagName('a'));
                    solvedQuestions.push(await aTag.getAttribute('href'));
                } else if (await td.getAttribute('value') !== 'notac') {
                    break;
                }
            }
            for(const solvedQuestion of solvedQuestions) {
                let questionName='';
                for(let i=0, slashCount=0;i<solvedQuestion.length;i++) {
                    if(solvedQuestion[i] === '/')
                        slashCount++;
                    if(slashCount === 4) {
                        questionName+=solvedQuestion[i];
                    }
                }
                questionName = questionName.slice(1,questionName.length);
                await driver.get(`${solvedQuestion}/submissions/`);
                const submission = await driver.findElement(By.css('#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-9z7f7i-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-xailxq-TabContent.e5i1odf5 > div > div > div > div > div > div > div > div > div > table > tbody > tr:nth-child(1) > td.status-column__3SUg > a'));
                const submissionLink = await submission.getAttribute('href');
                await driver.get(`${submissionLink}`);
                const codeBlock = await driver.findElement(By.xpath('/html/body/div[2]/div/div[1]/div/div[2]/div[7]/div/div[3]/div/div/div[3]/div/div[3]'));
                const mycode = await codeBlock.getText();
                const codeLanguageElement = await driver.findElement(By.xpath('//*[@id="result_language"]'));
                const codeLanguage = await codeLanguageElement.getText();
                console.log(questionName, mycode, codeLanguage);
                break;
            }
        }, 8000)

    } catch (e) {
        console.log(e);
        await driver.quit();
    }
    finally {
        //await driver.quit();
    }
})();
