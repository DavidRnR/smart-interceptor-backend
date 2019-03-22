const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

const tokenList = [];

exports.singIn =  (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
                const token = jwt.sign({email: user.email}, config.secret, {
                    expiresIn: 900
                });
                const refreshToken = jwt.sign({email: user.email}, config.refreshTokenSecret, {
                    expiresIn: 86400
                });
                const response = {
                    'access_token': token,
                    'refresh_token': refreshToken,
                }
                tokenList[refreshToken] = response;
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
        console.log(req.body);
        if (!userFinded) {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password
            });
            newUser.save().then(result => {
                console.log(result);
                res.status(200).json({...result._doc});
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

    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const token = jwt.sign({email: postData.email}, config.secret, {
            expiresIn: 900
        });
        const refreshToken = jwt.sign({email: postData.email}, config.refreshTokenSecret, {
            expiresIn: 86400
        });
        const response = {
            'access_token': token,
            'refresh_token': refreshToken,
        }
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }
};