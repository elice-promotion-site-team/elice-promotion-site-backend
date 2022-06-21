import { Request, NextFunction } from 'express';

const passport = require('passport');

export const getUserFromJWT = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.token) {
    next();
    return;
  }

  return passport.authenticate('jwt', { session: false })(req, res, next);
};
