const passport = require('passport');
const User = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
},
    function (req, email, password, done) {
        User.findOne({ email: email })
            .then(user => {
                if (!user || user.password != password) {
                    // flash
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch(err => {
                // flash
                return done(err);
            })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err))
});


passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/signIn');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;