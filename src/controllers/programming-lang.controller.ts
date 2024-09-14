import ProgrammingLang from "../models/programming-lang";

export const listAllProgrammingLang = (req: any, res: any) => {
    ProgrammingLang.find({}, (err: any, task: any) => {
        if (err)
            res.send(err);
        res.json(task);
    });
};

export const createProgrammingLang = (req: any, res: any) => {
    const newProgL = new ProgrammingLang(req.body);
    // newProgL.save((err: any, pl: any) => {
    //     if (err)
    //         res.send(err);
    //     res.json(pl);
    // });
};

export const deleteProgrammingLang = (req: any, res: any) => {
    ProgrammingLang.deleteOne({
        _id: req.params.programmingLangId
    }, (err: any, pl: any) => {
        if (err)
            res.send(err);
        res.json({
            message: 'Programming Language successfully deleted'
        });
    });
};