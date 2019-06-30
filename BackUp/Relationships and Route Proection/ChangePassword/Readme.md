# Passport Local Mongoose

- https://github.com/saintedlama/passport-local-mongoose

changePassword(oldPassword, newPassword, [cb])

Changes a user's password hash and salt, resets the user's number of failed password attempts and saves the user object (everything only if oldPassword is correct). If no callback cb is provided a Promise is returned. If oldPassword does not match the user's old password, an IncorrectPasswordError is passed to cb or the Promise is rejected.
