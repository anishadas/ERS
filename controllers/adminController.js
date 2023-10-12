module.exports.admin = async (req, res) => {
    return res.render('admin', {
        title: "admin page",

    })
}

module.exports.employees = async (req, res) => {
    return res.render('employees', {
        title: "employees page",

    })
}

module.exports.delete = async (req, res) => {
    
}

module.exports.setReviewer = async (req, res) => {
    
}

module.exports.newAdmin = async (req, res) => {
    
}