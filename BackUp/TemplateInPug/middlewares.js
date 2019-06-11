import routers from './routers';

export const localsMiddleware = (req, res, next) => {
	res.locals.siteName = 'MyTube';
	res.locals.routes = routers;
	next();
};
