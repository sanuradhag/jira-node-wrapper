import express from 'express';

import youtubeDLController from '../controllers/youtube-dl.controller';

const router = express.Router();


router.post('/download',
    (req, res) => {
        return youtubeDLController.download(req, res)
    }
);

export default router;
