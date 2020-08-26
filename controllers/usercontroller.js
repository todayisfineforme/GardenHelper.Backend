const { response } = require("express");
const User = require("./models/user");

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
            await this.user.save();
            response.status(200).json({ success: 'signup successful' });
        }
        catch (error) {
            response.status(500).json({ error: 'unable to signup user' });
        }
    }

    async loginUser(request, response) {
        User.findOne({ email: request.body.email }, (error, user) => {
            try {
                if (error) {
                    response.status(401).json({ error: 'unable to login user' });
                } else {

                    let isPasswordValid = user.validatePassword(request.body.password);
                    if (isPasswordValid)
                        response.status(200).json({ success: 'signin successful' });
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