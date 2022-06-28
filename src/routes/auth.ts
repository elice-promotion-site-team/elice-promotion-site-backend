import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { setUserToken, getUserDataFromToken } from '../utils/jwt';

const authRouter = Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const token = setUserToken(req.user);
      res.cookie('token', token).status(200).redirect('/');
    } else {
      res.status(404).json();
    }
  },
);

authRouter.get('/:token', (req: Request, res: Response, next: NextFunction) => {
  const user = getUserDataFromToken(req.params.token);
  res.json(user);
});

export { authRouter };
