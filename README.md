### Leetcode Solution Extracter

This is a web scrapper made for the purpose of extracting your solved question from leetcode.

<img src="demo.gif" width="500" height="500"  alt=""/>

### Requirements
1. Mozilla Firefox
2. Setup geckodriver (file provided inside the repository)
    1. Run this command inside the repo to Make geckodriver executable. Run this in terminal
    
        ```chmod +x geckodriver```
    2. Add the driver to your PATH so other tools can find it. Run this in terminal
    ```
   export PATH=$PATH:/path-to-geckodriver-file/.
   ```
3. NodeJS

### How to run
1. Clone this github repository
2. Run this command inside the cloned directory
    ```npm i``` 
3. Create a .env file and enter your leetcode credentials
```
email = 'your_email_here'
password = 'your_password_here'
```

### How does it work
1. It uses selenium webdriver to automate the task of finding questions.
2. Sorting them and finding solved ones.
3. Extract links of such questions and store in array.
4. Now loop in array and find submitted codes.
5. Make a new directory codes/ and write all the solved question's solution there.
