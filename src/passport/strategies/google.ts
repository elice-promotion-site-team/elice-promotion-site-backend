import 'dotenv/config';
import { Strategy, StrategyOptions, Profile, VerifyCallback } from 'passport-google-oauth20';
const { User } = require('../../db/models');

const config: StrategyOptions = {
  clientID: process.env.CLIENT_ID as string, // clientId 설정하기
  clientSecret: process.env.CLIENT_SECRET as string, // clientSecret 설정하기
  callbackURL: '/auth/google/callback',
};

async function findOrCreateUser(name: string, email: string) {
  const user = await User.findOne({
    email,
  });

  if (user) {
    return user;
  }

  const created = await User.create({
    name,
    email,
    password: 'GOOGLE_OAUTH',
  });

  return created;
}

module.exports = new Strategy(
  config,
  async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    const { email, name } = profile._json;

    try {
      const user = await findOrCreateUser(name!, email!);
      done(null, {
        shortId: user.shortId,
        email: user.email,
        name: user.name,
      });
    } catch (e) {
      //   done(e, null);
    }
  },
);
