const { response, request } = require("express");
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

    async getUser(request, response) {
        try {
            let userid = request.params.userid;

            let user = await User.findById(userid);

            if (user) {

                let userObject = {
                    name: user.username,
                    image: user.image
                }
                response.json(userObject)
            } else {
                response.status(401).json({ error: 'unable to find user' });
            }
        }
        catch (error) {
            response.status(401).json({ error: 'unable to find user' });
        }
    }

    async userUpdate(request, response) {
        try {
            let userid = request.body.userid;
            let user = await User.findById(userid);

            if (user) {
                if (request.body.name)
                    user.name = request.body.name;

                if (request.body.password)
                    user.setPassword(request.body.password);

                if (request.body.image)
                    user.image = request.body.image;

                if (request.body.email)
                    user.email = request.body.email;

                user.save();
                response.status(200).json({ success: 'user updated sucessfully' });

            } else {

                response.status(401).json({ error: 'unable to find user' });
            }
        }
        catch (error) {
            onse.status(500).json({ error: 'failed to update user' });
        }
    }

    createRoutes() {
        this.app.post('/user/signup', (request, response) => this.signUpUser(request, response));
        this.app.post('/user/signin', (request, response) => this.loginUser(request, response));
        this.app.get('/user/userInfo/:userid', (request, response) => this.getUser(request, response));
        this.app.put('./user/userInfo/update', (request, response) => this.userUpdate(request, response));
    }
}

module.exports = UserController;