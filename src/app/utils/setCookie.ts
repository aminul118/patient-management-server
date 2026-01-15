import { Response } from 'express';

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const sameSite = isProduction ? 'none' : 'lax'; // allow cross-subdomain in prod
  const domain = isProduction ? '.a1-lifts.com' : undefined;

  if (tokenInfo.accessToken) {
    res.cookie('accessToken', tokenInfo.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite,
      domain,
      path: '/', // always include
      maxAge: 86400000, // 1 day in sec
    });
  }

  if (tokenInfo.refreshToken) {
    res.cookie('refreshToken', tokenInfo.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite,
      domain,
      path: '/',
      maxAge: 604800000, // 7 days in second
    });
  }
};
