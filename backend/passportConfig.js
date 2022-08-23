
import JwtStrategy from 'passport-jwt';
const JwtStrategy1 = JwtStrategy.Strategy;
import ExtractJwt from 'passport-jwt';
const ExtractJwt1 = ExtractJwt.ExtractJwt;
import UserModel from './dbUser.js';
import passport from 'passport';
const secretOrKey = 'jwt_secret_key'
passport.use(new JwtStrategy1({
    jwtFromRequest: ExtractJwt1.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretOrKey
}, function async (jwt_payload, done) {
    UserModel.findOne({ id: jwt_payload._id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));