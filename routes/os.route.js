module.exports = (app) => {
    const OS = require('../controllers/os.controller');

    // OS Routes
    app.route('/api/app/os')
        .get(OS.listAllOS)
        .post(OS.createOS);


    app.route('/api/app/os/:osId')
        .delete(OS.deleteOS);
};