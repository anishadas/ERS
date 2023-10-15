const User = require('../models/users')
const Review = require('../models/reviews')

module.exports.admin = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/sign-in');
    }
    else {
        try {
            const users = await User.find({});
            return res.render('admin', {
                title: "admin page",
                users: users
            })
        } catch (err) {
            console.log('Error in admin', err);
            return;

        }
    }

}

module.exports.employees = async (req, res) => {
    try {
        const users = await User.find({});
        // console.log("chk", users)

        return res.render('employees', {
            title: "employees page",
            users: users
        })

    } catch (err) {
        console.log("cannot find users", err)
    }

}

module.exports.reviews = async (req, res) => {
    try {
        const reviews = await Review.find({}).sort('-createdAt').populate('from').populate('to');
        // console.log("chk", reviews)

        return res.render('reviews', {
            title: "reviews page",
            reviews
        })

    } catch (err) {
        console.log("cannot find users", err)
    }

}
module.exports.delete = async (req, res) => {
    try {

        if (req.isAuthenticated()) {
            if (req.user.isAdmin) {

                await User.deleteOne({ _id: req.params.id });
                return res.redirect('/admin/employees');
            }
        }
    } catch (err) {
        console.log("Error", err);
        return;
    }
}

module.exports.edit = async (req, res) => {
    try {

        if (req.isAuthenticated()) {
            if (req.user.isAdmin) {
                let employee = await User.findById(req.params.id);
                // console.log("edit", employee)
                if (employee) {
                    return res.render('edit', {
                        title: "Edit Details",
                        employee
                    })
                }

            }
        }
    } catch (err) {
        console.log("Error", err);
        return;
    }
}

module.exports.update = async (req, res) => {
    try {

        // console.log("update", req.body)
        let data = {
            name: req.body.empName,
            email: req.body.empMail
        }
        const employee = await User.findByIdAndUpdate({ _id: req.body.empId },
            data)
        // console.log("updated", employee)
        return res.redirect('/admin/employees')
    } catch (err) {
        console.log("Error", err);
        return;
    }
}

module.exports.setReviewer = async (req, res) => {
    try {
        // console.log("rev",req.body)
        if (!req.isAuthenticated()) {
            return res.redirect('/users/signIn')
        } else {
            // console.log("1")
            let employee = await User.findById(req.user.id);

            //only admins can assign task
            if (employee.isAdmin == false) {
                req.flash('error', 'You are not an admin');
                return res.redirect('/');
            }
            //reviewer && recipient cannot be same
            else if (req.body.reviewer == req.body.recipient) {
                return res.redirect('back');
            }
            else {
                // console.log("2")
                let reviewer = await User.findById(req.body.reviewer);

                // console.log("3",reviewer)
                if (!reviewer) {
                    return res.redirect('back');
                }

                let recipient = await User.findById(req.body.recpient);
                // console.log("4",recipient)
                if (!recipient) {
                    return res.redirect('back');
                }
                // console.log("chk",reviewer,recipient)
                reviewer.to.push(recipient);
                reviewer.save();

                recipient.from.push(reviewer);
                recipient.save();

                return res.redirect('back');

            }
        }

    } catch (err) {
        console.log("cannot set reviewer", err)
    }
}

module.exports.newAdmin = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/users/signIn');
        }
        if (req.user.isAdmin == true) {
            // console.log("0", req.body)
            let employee = await User.findById(req.body.recpient);
            // console.log("1", employee)
            //no employee found
            if (!employee) {
                return res.redirect('back');
            }

            //already admin
            if (employee.isAdmin == true) {
                return res.redirect('back');
            }

            if (employee.isAdmin == false) {
                // console.log("2")
                employee.isAdmin = true,
                    employee.save();

                return res.redirect('/admin');
            }
        }
    } catch (err) {
        console.log("Error", err);
        return;
    };
}