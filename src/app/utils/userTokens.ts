import httpStatus from 'http-status-codes';
import envVars from '../config/env';
import AppError from '../errorHelpers/AppError';
import { IsActive, IUser } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import { generateToken, verifyToken } from './jwt';
import { JwtPayload } from 'jsonwebtoken';

const createUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES,
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES,
  );

  return { accessToken, refreshToken };
};

const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
  const verified = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET,
  ) as JwtPayload;

  //  Better: use userId
  const user = await User.findById(verified.userId);

  if (!user) throw new AppError(httpStatus.BAD_REQUEST, 'User does not exist');

  if (
    user.isActive === IsActive.BLOCKED ||
    user.isActive === IsActive.INACTIVE
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, `User is ${user.isActive}`);
  }

  if (user.isDeleted)
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const newAccessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES,
  );

  const NewRefreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES,
  );

  return { accessToken: newAccessToken, refreshToken: NewRefreshToken };
};

export { createUserToken, createNewAccessTokenWithRefreshToken };
