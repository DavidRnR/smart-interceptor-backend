const ProgrammingLang = require('../models/programming-lang');

exports.listAllProgrammingLang = (req, res) => {
    ProgrammingLang.find({}, (err, task) => {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.createProgrammingLang = (req, res) => {
    const newProgL = new ProgrammingLang(req.body);
    newProgL.save((err, pl) => {
        if (err)
            res.send(err);
        res.json(pl);
    });
};

exports.deleteProgrammingLang = (req, res) => {
    ProgrammingLang.remove({
        _id: req.params.programmingLangId
    }, (err, pl) => {
        if (err)
            res.send(err);
        res.json({
            message: 'Programming Language successfully deleted'
        });
    });
};