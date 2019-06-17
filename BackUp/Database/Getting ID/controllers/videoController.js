import routes from '../routers';
import Video from '../models/Video';

export const home = async (req, res) => {
	try {
		const videos = await Video.find({});
		//console.log(videos);
		res.render('home', { pageTitle: 'Home', videos });
	} catch (error) {
		console.log(error);
		res.render('home', { pageTitle: 'Home', videos: [] });
	}
};
export const search = (req, res) => {
	const {
		query: { term: searchingBy }
	} = req;
	console.log(searchingBy);
	res.render('Search', { pageTitle: 'Search', searchingBy, videos });
};
export const vidoes = (req, res) =>
	res.render('videos', { pageTitle: 'Videos' });

export const getUpload = (req, res) =>
	res.render('upload', { pageTitle: 'Upload' });
export const postUpload = async (req, res) => {
	const {
		body: { title, description },
		file: { path }
	} = req;
	//console.log(file);
	const newVideo = await Video.create({
		fileUrl: path,
		title,
		description
	});
	//console.log(newVideo);
	res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
	//console.log(req.params);
	const {
		params: { id }
	} = req;
	try {
		const video = await Video.findById(id);
		//console.log(video);
		res.render('videoDetail', { pageTitle: 'Video Detail', video });
	} catch (error) {
		//console.log(error);
		res.redirect(routes.home);
	}
};
export const editVideo = (req, res) =>
	res.render('editVideo', { pageTitle: 'Edit Video' });
export const deleteVideo = (req, res) =>
	res.render('deleteVideo', { pageTitle: 'Delete Video' });
