import { Router } from 'express';
import passport from 'passport';
import { setUserToken } from '../utils/jwt';

const authRouter = Router();

authRouter.get('/google/', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', passport.authenticate('google', { session: false }), (req, res, next) => {
  setUserToken(res, req.user);
  res.redirect('/');
});

export { authRouter };
