import passport from 'passport';

const jwt = require('./strategies/jwt');
const google = require('./strategies/google');

module.exports = () => {
  passport.use(jwt);
  passport.use(google);
};
