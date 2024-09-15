import jwt, { VerifyErrors } from 'jsonwebtoken';
import User from '../models/User';
import { JWT_CONFIG } from '../config/config';
import { Request, Response } from 'express';

export const singIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(400).json({
        message: 'Invalid Password/Email',
      });
      return;
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      const response = getTokenResponse(user.email);
      res.status(200).json(response);
    } else {
      res.status(400).json({
        message: 'Invalid Password/Email',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Invalid Password/Email',
    });
  }
};

export const singUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      const newUser = await User.create({
        email,
        password,
      });
      const response = getTokenResponse(newUser.email);
      res.status(200).json(response);
      return;
    } else {
      res.status(400).json({
        message: 'User already exist',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Cannot create user',
    });
  }
};

export const refresh = (req: Request, res: Response) => {
  const postData = req.body;

  if (postData.refreshToken) {
    jwt.verify(postData.refreshToken, JWT_CONFIG.JWT_REFRESH_TOKEN_SECRET, (err: VerifyErrors | null) => {
      if (err) {
        return res.status(403).json({
          error: true,
          message: 'Unauthorized access.',
        });
      }

      const response = getTokenResponse(postData.email);

      res.status(200).json(response);
    });
  } else {
    res.status(404).send('Invalid request');
  }
};

function getTokenResponse(email: string) {
  const accessToken = jwt.sign(
    {
      email: email,
    },
    JWT_CONFIG.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: JWT_CONFIG.JWT_ACCESS_TOKEN_LIFE,
    },
  );
  const refreshToken = jwt.sign(
    {
      email: email,
    },
    JWT_CONFIG.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: JWT_CONFIG.JWT_REFRESH_TOKEN_LIFE,
    },
  );
  const response = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  return response;
}
