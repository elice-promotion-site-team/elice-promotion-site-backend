import { Router } from 'express';
import passport from 'passport';
// import {setUserToken} from '../utils/jwt';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res, next) => {
  //   setUserToken(res, req.user)
  res.redirect('/');
});

module.exports = router;
