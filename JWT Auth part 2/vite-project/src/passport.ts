import * as dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import passportJWT from "passport-jwt";
import { db } from "./db";
const { SECRET } = process.env;

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: passportJWT.ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const user = db.one(`Select * From users WHERE id=$1 `, playload.id);
      console.log(user);

      try {
        return user ? done(null, user) : done(new Eror("User not fount."));
      } catch (eror) {
        done(eror);
      }
    }
  )
);
