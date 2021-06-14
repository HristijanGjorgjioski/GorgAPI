const express = require('express');

const router = express.Router();

const { getPosts, getPostsBySearch, getPost, createPost, updatePost, likePost, deletePost } = require('../../controllers/Posts/postsController');

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

module.exports = router;