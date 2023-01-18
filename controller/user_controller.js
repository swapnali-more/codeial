const User = require('../models/User');
const fs = require('fs');
const path = require('path')

// render the profile page
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: 'Profile',
            profile_user: user
        })
    })
}

module.exports.update = async function (req, res) {
    // if (req.user.id = req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    //         return res.redirect('back')
    //     })
    // } else {
    //     return res.status(401).send('Unauthorized');
    // }
    if (req.user.id = req.params.id) {
        try {
           let user = await User.findById(req.params.id);
           User.uploadedAvatar(req, res, function(err) {
            if(err) {
                console.log('Multer Error', err)
            } 
            user.name = req.body.name;
            user.email = req.body.email;

            if(req.file) {
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                }
                //this is the saving the path of the uploaded fiel into the avatar field in the user
                user.avatar = User.avatarPath + '/' + req.file.filename
            }
            user.save();
            return res.redirect('back')
           })
        } catch (err) {
            req.flash('error', err);
            return res.redirect('back')
        }
    } else {
        req.flash('error', 'Unathorized!');
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    })
}

// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    })
}

//get the sign up data
module.exports.create = function (req, res) {
    console.log("req body", req.body)
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back')
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log("Error in finding user in signing up!"); return }



        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log("Error in creating user while in signing up!"); return }

                return res.redirect('/users/sign-in')
            })
        } else {
            return res.redirect('back')
        }
    })
}

//sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged In Successfully!')
    return res.redirect('/')
}

//get the sign out
module.exports.destroySession = function (req, res, next) {
    // req.logout();
    
    // return res.redirect('/')
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!')
        res.redirect('/');
    });
}