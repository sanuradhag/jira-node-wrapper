import jiraService from '../services/jiraService';

const JiraController = {};


JiraController.create = async (req, res) => {
  try {
    const {authToken, jiraSpace} = extractRequestData(req, res);

    if (!authToken || !jiraSpace) {
      return
    }
    const payload = req.body.payload;
    if (!payload) {
      return res.status(400).json({error: true, message: 'Valid payload not found!'})
    }

    const stream = await jiraService.createIssue(authToken, payload, jiraSpace);
    const dataText = await stream.text();

    if (!dataText.includes('<html>')) {
      const dataJson = JSON.parse(dataText);

      if (dataJson.errors) {
        console.warn('[WARN] JIRA response contains errors');
        return res.status(400).json({error: true, data: dataJson})
      }
      console.info('[INFO] HTTP POST request response received');
      return res.status(200).json({error: false, data: dataJson});
    } else {
      console.info('[INFO] JIRA responded with HTML content');
      return res.send(dataText);
    }

  } catch (error) {
    console.error('[ERROR] Internal Server Error ', error);
    return res.status(500).json({error: false, error});
  }
};

JiraController.delete = async (req, res) => {
  try {
    const issueID = req.body.issueID;
    const {authToken, jiraSpace} = extractRequestData(req, res);

    if (!authToken || !jiraSpace) {
      return
    }

    if (!issueID) {
      return res.status(400).json({error: true, message: 'Valid JIRA issue ID not found!'})
    }

    const stream = await jiraService.deleteIssue(authToken, issueID, jiraSpace);
    const dataText = await stream.text();

    if (!dataText.includes('<html>')) {
      if (dataText === '') {
        console.info('[INFO] HTTP DELETE request response received with empty content');
        return res.status(200).json({error: false, message: `Successfully deleted the issue ${issueID}`});
      }

      const dataJson = JSON.parse(dataText);

      if (dataJson.errors) {
        console.warn('[WARN] JIRA response contains errors');
        return res.status(400).json({error: true, data: dataJson})
      }
      console.info('[INFO] HTTP DELETE request response received');
      return res.status(200).json({error: false, data: dataJson});
    } else {
      console.info('[INFO] JIRA responded with HTML content');
      return res.send(dataText);
    }

  } catch (error) {
    console.error('[ERROR] Internal Server Error ', error);
    return res.status(500).json({error: false, error});
  }
};

const extractRequestData = (req, res) => {
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(' ')[1];
  const jiraSpace = req.body.jiraSpace;


  if (!authHeader.includes('Basic') || !authToken) {
    console.error('[ERROR] Basic authentication is missing in the request headers');
    return res.status(400).json({error: true, message: 'Valid basic authentication not found!'})
  }

  if (!jiraSpace) {
    console.error('[ERROR] JIRA instance is missing in the request body');
    return res.status(400).json({error: true, message: 'Valid JIRA instance not found!'})
  }
  return {
    authHeader,
    authToken,
    jiraSpace,
  }
};


export default JiraController;