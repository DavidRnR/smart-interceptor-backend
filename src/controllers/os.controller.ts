import OS from "../models/os";

export const listAllOS = (req: any, res: any) => {
    OS.find({}, (err: any, os: any) => {
        if (err)
            res.send(err);
        res.json(os);
    });
};

export const createOS = (req: any, res: any) => {
    const newProgL = new OS(req.body);
    // newProgL.save((err: any, task: any) => {
    //     if (err)
    //         res.send(err);
    //     res.json(task);
    // });
};

export const deleteOS = (req: any, res: any) => {
    OS.deleteOne({
        _id: req.params.osId
    }, (err: any, os: any) => {
        if (err)
            res.send(err);
        res.json({
            message: 'OS successfully deleted'
        });
    });
};