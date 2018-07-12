# JIRA-NODE-WRAPPER

### Instructions

Before running the project run the command 
```sh
$ npm install 
```
or 
```sh
$ yarn
```

Start development server

```sh
$ npm run start:dev
```

To create a issue
You need to put this request through postman

```sh
curl -X POST \
  http://localhost:3000/jira/create \
  -H 'authorization: Basic AuthToken' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
        "payload": {
          "fields": {
            "project": {
              "id": "10000"
            },
            "summary": "issue created from node",
            "issuetype": {
              "id": "10000"
            },
            "labels": [
              "bugfix",
              "blitz_test"
            ],
            "description": "first jira issue from node js",
            "fixVersions": [
              {
                "id": "10001"
              }
            ],
            "customfield_10010": "epic name"
          }
        },
        "jiraSpace": "jiraInstance"
      }''
```

You can access the api from localhost:3000

