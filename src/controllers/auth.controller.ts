import jwt from "jsonwebtoken";
import User from "../models/user";
import config from "../config";

export const singIn = (req: any, res: any) => {
  User.findOne({
    email: req.body.email,
  }).then((user: any) => {
    user.comparePassword(req.body.password, (err: any, isMatch: any) => {
      if (isMatch) {
        const response = getTokenResponse(user.email);
        res.status(200).json(response);
      } else {
        res.status(400).json({
          message: "Invalid Password/Username",
        });
      }
    });
  });
};

export const singUp = (req: any, res: any) => {
  User.findOne({
    email: req.body.email,
  })
    .then((userFinded: any) => {
      if (!userFinded) {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
        });
        newUser
          .save()
          .then((result: any) => {
            console.log(result);
            res.status(200).json({
              ...result._doc,
            });
          })
          .catch((err: any) => {
            console.log(err);
            throw err;
          });
      } else {
        res.status(400).json({
          message: "Username already exist",
        });
      }
    })
    .catch((err: any) => {
      console.log(err);
      throw err;
    });
};

export const getToken = (req: any, res: any) => {
  const postData = req.body;

  if (postData.refresh_token) {
    jwt.verify(
      postData.refresh_token,
      config.refreshTokenSecret,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({
            error: true,
            message: "Unauthorized access.",
          });
        }

        const response = getTokenResponse(postData.email);

        res.status(200).json(response);
      }
    );
  } else {
    res.status(404).send("Invalid request");
  }
};

function getTokenResponse(email: string) {
  const token = jwt.sign(
    {
      email: email,
    },
    config.secret,
    {
      expiresIn: config.tokenLife,
    }
  );
  const refreshToken = jwt.sign(
    {
      email: email,
    },
    config.refreshTokenSecret,
    {
      expiresIn: config.refreshTokenLife,
    }
  );
  const response = {
    access_token: token,
    refresh_token: refreshToken,
  };

  return response;
}
