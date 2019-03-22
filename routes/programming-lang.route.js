module.exports = (app) => {
    const ProgrammingLang = require('../controllers/programming-lang.controller');

    // ProgrammingLang Routes
    app.route('/api/app/programmingLang')
        .get(ProgrammingLang.listAllProgrammingLang)
        .post(ProgrammingLang.createProgrammingLang);


    app.route('/api/app/programmingLang/:programmingLangId')
        .delete(ProgrammingLang.deleteProgrammingLang);
};