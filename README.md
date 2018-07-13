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
        "jiraSpace": "jira instance url"
      }''
```


To delete a issue
You need to put this request through postman.

```sh
  curl -X POST \
    http://localhost:3000/jira/delete/ \
    -H 'authorization: Basic AuthToken' \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -H 'postman-token: 732f06db-879c-d59a-b367-f28355948d1b' \
    -d '{
    "jiraSpace": "jira instance url",
    "issueID": "SCRUM-40"
  }'
```
You can access the api from [http://localhost:3000/](http://localhost:3000/)

You can access the swagger api documentation from [http://localhost:3000/docs/](http://localhost:3000/docs/)

