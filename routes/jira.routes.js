import express from 'express';

import jiraController from '../controllers/jira.controller';

const router = express.Router();

/**
 * @swagger
 * /jira/create:
 *    post:
 *     summary: Create a issue in jira space.
 *     tags:
 *       - JIRA
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - payload
 *             - jiraSpace
 *           properties:
 *             payload:
 *               type: object
 *             jiraSpace:
 *               type: string
 *           example: {
 *	           "payload": {
 *                   "fields": {
 *                      "project": {
 *                         "id": "10000"
 *                       },
 *                      "summary": "issue created from node",
 *                  "issuetype": {
 *                     "id": "10000"
 *                   },
 *                  "labels": [
 *                      "Label1",
 *                      "Label2"
 *                   ],
 *                  "description": "first jira issue from node js",
 *                  "fixVersions": [
 *                           {
 *                            "id": "10001"
 *                           }
 *                                ],
 *                  "customfield_10010": "epic name"
 *              },
 *           "jiraSpace": "https://anuradhag.atlassian.net"
 *              }
 *           }
 *     responses:
 *       400:
 *         description: When basic authentication or jira instance is not found
 *       500:
 *         description: When server cannot handle the request
 */
router.post('/create',
  (req, res) => {
    return jiraController.create(req, res)
  }
);


/**
 * @swagger
 * /jira/delete:
 *    post:
 *     summary: Delete a issue in jira space.
 *     tags:
 *       - JIRA
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - issueID
 *             - jiraSpace
 *           properties:
 *             issueID:
 *               type: string
 *             jiraSpace:
 *               type: string
 *           example: {
 *                        "jiraSpace": "https://anuradhag.atlassian.net",
 *                         "issueID": "SCRUM-40"
 *                    }
 *     responses:
 *       400:
 *         description: When basic authentication or jira instance is not found
 *       500:
 *         description: When server cannot handle the request
 */
router.post('/delete',
  (req, res) => {
    return jiraController.delete(req, res)
  }
);

export default router;