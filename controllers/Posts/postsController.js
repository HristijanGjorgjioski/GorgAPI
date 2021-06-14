const Post = require('../../models/Posts/postsModel');
const User = require('../../models/Auth/authModel');

exports.getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
}

exports.createPost = async (req, res) => {
    const { description, selectedFile, creator, name } = req.body;

    try {
        const result = await Post.create({ creator, name, description, photo: selectedFile });

        res.status(201).json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}
