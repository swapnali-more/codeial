const Post = require('../models/Post')
const Comment = require('../models/Comment')

module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        req.flash('success', 'Post Published!')
        return res.redirect('back')
    } catch (err) {
        //console.log("Error", err);
        req.flash("error", err)
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id)

        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            req.flash('success', 'Post and associated comments are deleted!')
            return res.redirect('back');
        } else {
            req.flash("error", "You cannot delete the post!")
            return res.redirect('back')
        }
    } catch (err) {
        //console.log("Error", err);
        req.flash("error", err)
        return;
    }
}