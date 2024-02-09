import * as jwt from 'jsonwebtoken';

export const createJWT = (payload: any) => {
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return jwtToken;
};

export const compareJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
