import express from 'express';
import routes from '../routers';

const globalRouter = express.Router();

globalRouter.get(routes.home, (req, res) => res.send('HOME'));
globalRouter.get(routes.joins, (req, res) => res.send('JOINS'));
globalRouter.get(routes.login, (req, res) => res.send('LOGIN'));
globalRouter.get(routes.logout, (req, res) => res.send('LOGOUT'));
globalRouter.get(routes.search, (req, res) => res.send('SEARCH'));

export default globalRouter;
