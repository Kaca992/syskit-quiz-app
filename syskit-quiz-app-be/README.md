# Azure Functions Quiz Backend

This is the backend part of an simple quiz application. It is made using Azure Functions (written in C#).

## Getting Started

### Prerequisites

For local development testing you will need to install the following:

* Visual Studio 2017 with the Azure Development SDK installed ([Link](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-vs#prerequisites))
* SQL Database engine or LocalDB for the database
* For deployment to Azure you will need a valid Azure subscription

### Installing

 1. After installing Visual Studio and the database engine you will need to publish the AzureFunctions.Quiz.Database project
 2. In the ~/AzureFunctions.Quiz.App/ folder create the local.settings.json file and insert the following code with your database connection string:
 
 ```
 {
  "IsEncrypted": false,
  "ConnectionStrings": {
    "ConnectionString": [your connection string]
  }
}
 ```
 3. You can now run your project locally and send requests using a tool like Postman
 
## API Endpoints

### Questions

* Insert new questions

```
Endpoint : /api/questions,
HttpMethods: [post],
AuthorizationLevel: anonymous,
Content-Type: application/json,
Input: {
  body: {
    "questionText": string,
    "answers": [
      {"answerText": string, "isCorrectAnswer?": "true" | "false" }
    ]
  }
},
Output: {}

```

isCorrectAnswer is an optional parameter, but **AT LEAST** one answer must have it otherwise an error will be thrown

* Get questions

```
Endpoint : /api/questions/{number:int=10},
HttpMethods: [get],
AuthorizationLevel: anonymous,
Content-Type: application/json,
Input: { },
Output: {
  [
    {id: number, questionText: string, answers: [{id: number, answerText: string}]}
  ]
}
```
Url parameter number defines number of RANDOM returned questions.

### Participants

* Insert new participant
Inserts a new quiz participant with his quiz answers.

```
Endpoint : /api/participant,
HttpMethods: [post],
AuthorizationLevel: anonymous,
Content-Type: application/json,
Input: {
  body: {
    "participant": {"name": string, "email": string, "course": string, "enrollmentYear": string},
    "answers": {"questionId": number, "answerId": number}
  }
},
Output: {}
```

* Get all participants

```
Endpoint : /api/participant,
HttpMethods: [get],
AuthorizationLevel: anonymous,
Content-Type: application/json,
Input: {},
Output: {
  [{"name": string, "email": string, "course": string, "enrollmentYear": string, "result": number}]
}
```

## Built With

* [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
* C#
* SQL

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
