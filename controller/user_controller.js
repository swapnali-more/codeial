const User = require('../models/user')

// render the profile page
module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'Profile'
    })
}

// render the sign up page
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    })
}

// render the sign in page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    })
}

//get the sign up data
module.exports.create = function(req, res) {
    console.log("req body", req.body)
    if(req.body.password != req.body.confirm_password) {
        return res.redirect('back')
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {console.log("Error in finding user in signing up!"); return}

        

        if(!user) {
            User.create(req.body, function(err, user) {
                if(err) {console.log("Error in creating user while in signing up!"); return}

                return res.redirect('/users/sign-in')
            })
        } else {
            return res.redirect('back')
        }
    })
}

//get the sign in data
module.exports.createSession = function(req, res) {
    
}