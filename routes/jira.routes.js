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
 *             - title
 *             - category
 *             - tags
 *             - description
 *             - images
 *             - operationArea
 *             - currency
 *             - amountPerService
 *             - city
 *             - address
 *             - phone
 *             - website
 *             - email
 *           properties:
 *             title:
 *               type: string
 *             createdBy:
 *               type: string
 *             category:
 *               type: string
 *             tags:
 *               type: string
 *             images:
 *               type: array
 *             operationArea:
 *               type: number
 *             currency:
 *               type: string
 *             amountPerService:
 *               type: string
 *             city:
 *               type: string
 *             address:
 *               type: string
 *             phone:
 *               type: string
 *             website:
 *               type: number
 *             email:
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

router.delete('/delete/:id/:jiraSpace',
  (req, res) => {
    return jiraController.delete(req, res)
  }
);

export default router;