const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const DB = require("./db");
const path = require("path");
const fs = require("fs");

const pathToKey = path.join(__dirname, "../id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const verifyCallback = (jwt_payload, done) => {
  DB.query(
    `select * from auth where id='${jwt_payload.sub}'`,
    (err, result, field) => {
      if (err) {
        return done(err);
      }
      if (result.length > 0) {
        return done(null, result);
      } else {
        return done(null, false);
      }
    }
  );
};

const Strategy = new JwtStrategy(options, verifyCallback);

module.exports = (passport) => {
  passport.use(Strategy);
};
