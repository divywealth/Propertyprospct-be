import { NextFunction, Request, Response } from 'express';
import { UnAuthorized401 } from './StatusResponse';
import { JwtService } from '@nestjs/jwt';

export const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(UnAuthorized401('Authorization header is missing'));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(UnAuthorized401('Token is missing'));
  }

  try {
    const jwtService = new JwtService({ secret: process.env.JWT_SECRET})
    const decodedToken = await jwtService.verifyAsync(token)
    req.user = decodedToken.user
    console.log(req.user)
    next()
  } catch (error) {
    next(UnAuthorized401('Invalid token'));
  }
};
