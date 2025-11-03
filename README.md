# todoit

API Connector for Todoist

## Prerequisites

1) register an application and get a "test token"
2) create a folder ```private``` at the in package folder
3) in the ```private``` folder create a file ```secrets.json```
4) add the following object to ```secrets.json```

``` JSON
{
    "apiToken": "YOUR_TEST_TOKEN_HERE"
}
```

### Getting a "test token"

> To get started quickly with your app development, you may create an access token to your own account without going through the authorization process. The generated token will have the full scope access.

<https://app.todoist.com/app/settings/integrations/app-management>

## Use

Install with ```npm install```

Run with ```npx todoit```

## packages used

[inquirer](https://github.com/SBoudrias/Inquirer.js) | [progress](https://github.com/visionmedia/node-progress/)

## References

[Documentation for Todoist REST API](https://developer.todoist.com/rest/v2/#overview)
