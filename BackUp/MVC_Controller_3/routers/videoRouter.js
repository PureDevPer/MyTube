import express from 'express';
import routes from '../routers';

const videoRouter = express.Router();

videoRouter.get(routes.vidoes, (req, res) => res.send('Videos'));
videoRouter.get(routes.upload, (req, res) => res.send('Upload'));
videoRouter.get(routes.videoDetail, (req, res) => res.send('Videos Detail'));
videoRouter.get(routes.editVideo, (req, res) => res.send('Edit Videos'));
videoRouter.get(routes.deleteVideo, (req, res) => res.send('Delete Videos'));

export default videoRouter;
