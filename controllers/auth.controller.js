const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

exports.singIn = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
                const response = getTokenResponse(user.email);
                res.status(200).json(response);
            } else {
                res.status(400).json({
                    message: 'Invalid Password/Username'
                });
            }
        });
    });
};

exports.singUp = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((userFinded) => {
        if (!userFinded) {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password
            });
            newUser.save().then(result => {
                console.log(result);
                res.status(200).json({
                    ...result._doc
                });
            }).catch(err => {
                console.log(err);
                throw err;
            });
        } else {
            res.status(400).json({
                message: 'Username already exist'
            });
        }
    }).catch(err => {
        console.log(err);
        throw err;
    });;
};

exports.getToken = (req, res) => {
    const postData = req.body

    if ((postData.refresh_token)) {

        jwt.verify(postData.refresh_token, config.refreshTokenSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    'error': true,
                    'message': 'Unauthorized access.'
                });
            }

            const response = getTokenResponse(postData.email);

            res.status(200).json(response);
        });
    } else {
        res.status(404).send('Invalid request')
    }
};


function getTokenResponse(email) {
    const token = jwt.sign({
        email: email
    }, config.secret, {
        expiresIn: config.tokenLife
    });
    const refreshToken = jwt.sign({
        email: email
    }, config.refreshTokenSecret, {
        expiresIn: config.refreshTokenLife
    });
    const response = {
        'access_token': token,
        'refresh_token': refreshToken,
    }

    return response;
}