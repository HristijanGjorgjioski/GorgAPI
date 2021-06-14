const Post = require('../../models/Posts/postsModel');
const User = require('../../models/Auth/authModel');

exports.getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
}

exports.getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getPostBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
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

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

exports.likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
}
