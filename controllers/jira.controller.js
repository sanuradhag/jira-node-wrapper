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
        return res.status(400).json({error: true, data: dataJson})
      }
      return res.status(200).json({error: false, data: dataJson});
    } else {
      return res.send(dataText);
    }

  } catch (error) {
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
        return res.status(200).json({error: false, message: `Successfully deleted the issue ${issueID}`});
      }

      const dataJson = JSON.parse(dataText);

      if (dataJson.errors) {
        return res.status(400).json({error: true, data: dataJson})
      }
      return res.status(200).json({error: false, data: dataJson});
    } else {
      return res.send(dataText);
    }

  } catch (error) {
    return res.status(500).json({error: false, error});
  }
};

const extractRequestData = (req, res) => {
  console.log('extracting');
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(' ')[1];
  const jiraSpace = req.body.jiraSpace;


  if (!authHeader.includes('Basic') || !authToken) {
    return res.status(400).json({error: true, message: 'Valid basic authentication not found!'})
  }

  if (!jiraSpace) {
    return res.status(400).json({error: true, message: 'Valid JIRA instance not found!'})
  }
  return {
    authHeader,
    authToken,
    jiraSpace,
  }
};


export default JiraController;