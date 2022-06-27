import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { setUserToken } from '../utils/jwt';

const authRouter = Router();

authRouter.get('/google/', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    setUserToken(res, req.user);
    res.status(200).json();
  },
);

export { authRouter };
