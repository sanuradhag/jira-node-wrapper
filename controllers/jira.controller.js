import jiraService from '../services/jiraService';

const JiraController = {};


JiraController.create = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(' ')[1];
    const jiraSpace = req.body.jiraSpace;

    if (!authHeader.includes('Basic') || !authToken) {
      return res.status(400).json({error: true, message: 'Valid basic authentication not found!'})
    }

    if (!jiraSpace) {
      return res.status(400).json({error: true, message: 'Valid JIRA instance not found!'})
    }
    const stream = await jiraService.createIssue(authToken, req.body.payload, jiraSpace);
    const dataText = await stream.text();

    if (!dataText.includes('<html>')) {
      const dataJson = JSON.parse(dataText);

      if (dataJson.errors) {
        return res.status(400).json({error: true, dataJson})
      }
      return res.status(200).json({error: false, dataJson});
    } else {
      return res.send(dataText);
    }

  } catch (error) {
    return res.status(500).json({error: false, error});
  }
};

JiraController.delete = async (req, res) => {

};

export default JiraController;