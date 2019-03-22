const OS = require('../models/os');

exports.listAllOS = (req, res) => {
    OS.find({}, (err, os) => {
        if (err)
            res.send(err);
        res.json(os);
    });
};

exports.createOS = (req, res) => {
    const newProgL = new OS(req.body);
    newProgL.save((err, task) => {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.deleteOS = (req, res) => {
    OS.remove({
        _id: req.params.osId
    }, (err, os) => {
        if (err)
            res.send(err);
        res.json({
            message: 'OS successfully deleted'
        });
    });
};