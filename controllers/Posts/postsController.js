const Post = require('../../models/Posts/postsModel');
const User = require('../../models/Auth/authModel');

exports.getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
}

exports.createPost = async (req, res) => {

}

exports.deletePost = async (req, res) => {

}
