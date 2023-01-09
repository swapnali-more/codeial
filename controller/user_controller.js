const User = require('../models/user')

// render the profile page
module.exports.profile = function (req, res) {
    if(req.cookies.user_id) {
        User.findById(req.cookies.user_id, function(err, user) {
            if(user) {
                return res.render('user_profile', {
                    title: 'User Profile',
                    user: user
                })
            } 
            return res.redirect('/users/sign-in')
        })
    } else {
        return res.redirect('/users/sign-in')
    }
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
    //step to authentication
    //find the user
    console.log(req.body, "login")
    User.findOne({email: req.body.email}, function(err, user) {
        
        if(err) {
            console.log('error in finding user in signing in!');
            return;
        }

        //handle use found
        if(user) {
            //handle password which doesn't match
            if(user.password != req.body.password) {
                return res.redirect('back')
            }
            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            //handle user not found
        }
    })  
}