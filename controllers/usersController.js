const User = require('../models/users');
const Review = require('../models/reviews');

module.exports.create = async (req, res) => {
    // console.log("user1", req.body)
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
                    isAdmin: false,
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
            title: "home page",
            recipients: [],
            reviews: [],
            user: {}
        })
    }
    return res.render('user_sign_up', {
        title: "SIGN UP",
    })
};


module.exports.home = async (req, res) => {
    console.log("hhhhhhhhhh")
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/users/sign-in');
        }

        let user = await User.findById(req.user.id);
        let review = await Review.find({ to: req.user.id });


        let recipients = [];
        console.log("1", user)
        for (let i = 0; i < user.to.length; i++) {
            // console.log("2",user.to[i])
            let x = await User.findById(user.to[i]);
            // console.log("3",x)
            if (x != null) recipients.push(x);
        }

        // find reviews
        let reviews = [];

        for (let i = 0; i < review.length; i++) {
            let x = await User.findById(review[i].from);


            let curr_review = {
                name: x.name,
                review: review[i].review,
                updated: review[i].updatedAt,
            };
            reviews.push(curr_review);
        }
        return res.render('home', {
            title: "Home",
            recipients: recipients,
            reviews: reviews,
            user: user,
        });

    } catch (error) {
        console.log(error);
        return;
    }
}