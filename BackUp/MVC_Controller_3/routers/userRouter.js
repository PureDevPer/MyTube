import express from 'express';
import routes from '../routers';

const userRouter = express.Router();

userRouter.get(routes.users, (req, res) => res.send('USERS'));
userRouter.get(routes.userDetail, (req, res) => res.send('USERS_DETAILs'));
userRouter.get(routes.editProfile, (req, res) => res.send('Edit Profile'));
userRouter.get(routes.changePassword, (req, res) =>
	res.send('Change Passowrd')
);

export default userRouter;
