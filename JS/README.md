# What is inside the .gitignore file? 

.gitignore file has a ignore the configuration file `config.js` in order to hide API keys in Github. 

## How the API keys are hide inside Git Ignore. 

- To start, in the terminal, in the root of your project, create a `config.js` file and open it up: 
```
touch config.js
```

- Next in the config file you have just created, enter your API keys in an object like so (naming them whatever you like, and putting the keys in as strings). You don't need any other code in this file: 
```
var config = {
    API_KEY : '1234567890'
}
```

- In your HTML file, add a script link to this file BELOW your jQuery script but ABOVE your own script file links: 
```
<script type='text/javascript' src='config.js'></script>
<script type='text/javascript' src='app.js'></script>
```

- In your javascript/jquery file (probably script.js), declare variables that point to your API keys in the config file like so. Note that the `config` here refers to the object called `config`, NOT to the file `config.js`: 
```
var mykey = config.API_KEY; 
```

- Be sure to replace every instance of the API keys with these new variables. 

- Now again in the terminal, create a .gitignore file in the roow of your project and open in visual studio code or whatever editor you are using. Note the period at the start of the file name: 
```
touch .gitignore
```

- In the .gitignore file, enter any file names that you want git NOT to track/commit/push. No other code is necessary. 

- In this case, you would enter: 
```
config.js
```

- Now in the terminal type: 
```
git status
```
You should see the .gitignore file ready to be tracked. You should NOT see the config.js file. 

- Now add the change to the working directory to the staging area. Then push the changes to the remote repository.
- Make sure the `config.js` file didn't get added. If everything looks good, your're ready to commit and push. 

Again it is important to stress if you are deploying a frontend-only applicaiton you cannot hide anything from your deployed site. 

If your code needs to access a value to make an API request, that value will be visible in the browser's dev tools to any user who feels like checking. Any API request you make will be visible in the Network tab and will show the full URL and any headers, will expose the key. This is not the method you would use to hide your keys during deployment. I cannot stress this enough. 

Any way, I hope this quick tutorial helps people new to programming push their projects to GitHub without sharing their API keys. 



