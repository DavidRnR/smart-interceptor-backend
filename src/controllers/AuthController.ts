import jwt, { VerifyErrors } from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/config';
import { Request, Response } from 'express';
import { RefreshRequestDTO, SignInRequestDTO, SignInResponseDTO, SignUpRequestDTO, SignUpResponseDTO } from '../dto/AuthDTO';
import { ApiResponseErrorDTO } from '../dto/ApiDTO';
import userService from '../services/userService';

export const singIn = async (req: Request<object, object, SignInRequestDTO>, res: Response<SignInResponseDTO | ApiResponseErrorDTO>) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
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

export const singUp = async (req: Request<object, object, SignUpRequestDTO>, res: Response<SignUpResponseDTO | ApiResponseErrorDTO>) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      const newUser = await userService.createUser({
        email,
        password,
      });
      const response = getTokenResponse(newUser.email);
      res.status(200).json(response);
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

export const refresh = (req: Request<object, object, RefreshRequestDTO>, res: Response<SignInResponseDTO | ApiResponseErrorDTO>) => {
  const postData = req.body;

  if (postData.refreshToken) {
    jwt.verify(postData.refreshToken, JWT_CONFIG.JWT_REFRESH_TOKEN_SECRET, (err: VerifyErrors | null) => {
      if (err) {
        return res.status(403).json({
          message: 'Unauthorized access.',
        });
      }

      const response = getTokenResponse(postData.email);

      res.status(200).json(response);
    });
  } else {
    res.status(404).send({ message: 'Invalid request' });
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
