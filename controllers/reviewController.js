const Review = require('../models/reviews');
const User = require('../models/users');

module.exports.createRev = async (req, res) => {
    try {
        console.log("reviews", req.params.id)
        let recipient = await User.findById(req.params.id);
        console.log("1", recipient)
        if (!recipient) {
            return res.redirect('/');
        }
        console.log("recipient", recipient)

        for (let i = 0; i < recipient.from.length; i++) {
            if (req.user) {
                if (recipient.from[i] == req.user.id) {
                    console.log("2")
                    const new_review = Review.create({
                        to: recipient.id,
                        from: req.user.id,
                        review: req.query.newReview.trim(),
                    });

                    if (!new_review) {
                    }

                    return res.redirect('/');
                }
                else if(req.user.isAdmin){
                    const new_review = Review.create({
                        to: recipient.id,
                        from: req.user.id,
                        review: req.query.newReview.trim(),
                    });
                }
            } else {
                return res.redirect("/user/signIn");
            }
        }
        return res.redirect('/');
    } catch (err) {
        console.log("Error", err);
        return;
    }

}

module.exports.edit = async (req, res) => {
    try {
        // console.log("review edit")
        if (req.isAuthenticated()) {
            if (req.user.isAdmin) {
                let review = await Review.findById(req.params.id);
                if (!review) {

                    return res.render('editReview', {
                        title: "Edit Details",
                        review: "",
                        reviewTo: req.params.id
                    })
                }
                else {
                    
                    if (review) {
                        return res.render('editReview', {
                            title: "Edit Details",
                            review
                        })
                    }
                }


            }
        }
    } catch (err) {
        console.log("error in editing review", err);
    }
}

module.exports.update = async (req, res) => {
    try {

        // console.log("update", req.body)
        let data = {
            review: req.body.editReview.trim(),
            editedBy: req.user.name
        }
        const review = await Review.findByIdAndUpdate({ _id: req.body.revId },
            data)
        // console.log("updated", review)
        return res.redirect('/admin/allReviews')
    } catch (err) {
        console.log("Error", err);
        return;
    }
}