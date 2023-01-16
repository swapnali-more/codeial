const Post = require('../models/Post')
const User = require('../models/User')

module.exports.home = function (req, res) {
    // console.log(req.cookies);

    // Post.find({}, function(err, posts) {
    //     return res.render('home', {
    //         title: 'Codeial | Home',
    //         posts: posts
    //     })
    // })
   
    // populate the user of each posts
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts) {
        User.find({}, function(err, user) {
            return res.render('home', {
                title: 'Codeial | Home',
                posts: posts,
                all_users: user
            })
        })
    })
}