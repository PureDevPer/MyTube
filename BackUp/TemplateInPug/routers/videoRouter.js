import express from 'express';
import routes from '../routers';
import {
	vidoes,
	upload,
	videoDetail,
	editVideo,
	deleteVideo
} from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get(routes.vidoes, vidoes);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
