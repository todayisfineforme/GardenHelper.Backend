const { response } = require("express");
const User = require("../models/user");

class UserController {
    constructor(app) {
        this.app = app;
    }

    async signUpUser(request, response) {
        try {
            let user = new User();
            user.email = request.body.email;
            user.username = request.body.username;
            user.setPassword(request.body.password);
            await user.save();
            response.status(200).json({ success: 'signup successful' });
        }
        catch (error) {
            let errorObject = {
                message: 'unable to signup user'
            }
            if (error.code == 11000)
                errorObject.error = 'Email already exists';

            response.status(500).json(errorObject);
        }
    }

    async loginUser(request, response) {
        User.findOne({ email: request.body.email }, (error, user) => {
            try {
                if (error || !user) {
                    response.status(401).json({ error: 'unable to login user' });
                } else {

                    let isPasswordValid = user.validatePassword(request.body.password);
                    if (isPasswordValid) {

                        response.status(200).json({
                            success: 'user logged in',
                            userid: user.id
                        });
                    }
                    else
                        response.status(401).json({ error: 'unable to login user' });
                }
            }
            catch (error) {
                response.status(401).json({ error: 'unable to login user' });
            }
        });
    }
    createRoutes() {
        this.app.post('/user/signup', (request, response) => this.signUpUser(request, response));
        this.app.post('/user/signin', (request, response) => this.loginUser(request, response));
    }
}

module.exports = UserController;