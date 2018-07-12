import config from '../core/config';
import fetch from 'node-fetch';

const JiraService = {};

JiraService.createIssue = (authToken, payload, baseUrl) => {
  const url = `${baseUrl}/${config.JIRA.issueUrl}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: `Basic ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};

JiraService.deleteIssue = (authToken, id, baseUrl) => {
  const url = `${baseUrl}/${config.JIRA.issueUrl}/id`;

  return fetch(url, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: `Basic ${authToken}`,
      'content-type': 'application/json'
    }
  });
};

export default JiraService;