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

//serializeUser determines which data of the user object should be stored in the session. 
//The result of the serializeUser method is attached to the session as req.session.passport.user = { }.
//Here for instance, it would be(as we provide the user id as the key) 
//req.session.passport.user = { id: 'xyz' }

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

//The first argument of deserializeUser corresponds to the key of the user object that was given to 
//the done function (see 1.). So your whole object is retrieved with help of that key.That key here is 
//the user id(key can be any key of the user object i.e.name, email etc).In deserializeUser that key 
//is matched with the in memory array / database or any data resource.

// fetched object is attached to the request object as req.user
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