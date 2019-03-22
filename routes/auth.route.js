module.exports = (app) => {
    const Auth = require('../controllers/auth.controller');

    // Auth Routes
    app.route('/api/auth/signup')
        .post(Auth.singUp);

    app.route('/api/auth/signin')
    .post(Auth.singIn);

    app.route('/api/auth/token')
    .get(Auth.getToken);
};