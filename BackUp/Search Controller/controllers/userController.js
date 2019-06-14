export const joins = (req, res) => res.render('join', { pageTitle: 'join' });
export const login = (req, res) => res.render('login', { pageTitle: 'login' });
export const logout = (req, res) =>
	res.render('logout', { pageTitle: 'logout' });
export const users = (req, res) => res.render('users', { pageTitle: 'users' });
export const userDetail = (req, res) =>
	res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) =>
	res.render('edit profile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) =>
	res.render('change password', { pageTitle: 'Change Password' });
