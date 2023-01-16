const Post = require('../models/Post')
const User = require('../models/User')

module.exports.home = async function (req, res) {

    // populate the user of each posts
    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })

        let users = await User.find({});

        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
        })
    } catch (err) {
        console.log('Error', err);
        return;
    }

}