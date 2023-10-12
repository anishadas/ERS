const User = require('../models/users');

module.exports.create = async (req, res) => {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    isAdmin:false,
                })
                    .then(user => {
                        req.flash('success', 'Sign Up successful');
                        return res.redirect('/')
                    })
                    .catch(err => console.log("error in finding the user in sigining up"))
            } else {
                return res.redirect("back");
            }
        })
        .catch(err => console.log("error in finding the user in sigining up"))
};

module.exports.createSession = (req, res) => {
    req.flash("success", "Logged In Successfully");
    return res.redirect('/')
}


module.exports.signIn = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('home', {
            title: "home page"
        })
    }
    return res.render('user_sign_in', {
        title: "SIGN IN",
    })
};

module.exports.signOut = async (req, res, next) => {
    req.logout(function (err) {
        if (err) next(err);
        req.flash('success', "logged out");
        return res.redirect('/users/signIn');
    });
};


module.exports.signUp = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('home', {
            title: "home page"
        })
    }
    return res.render('user_sign_up', {
        title: "SIGN UP",
    })
};


module.exports.home = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/users/signIn');
        }
        // let user = await User.findById(req.user.id);
        return res.render('home', {
            title: 'Home',
            // user: user
        });
    } catch (err) {
        console.log(err)
        return;
    }
}