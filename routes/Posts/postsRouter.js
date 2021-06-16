const express = require('express');

const { getPosts, getPostsBySearch, getPost, createPost, updatePost, likePost, deletePost } = require('../../controllers/Posts/postsController');

const router = express.Router();
const auth = require('../../middlewares/authMiddleware');

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

module.exports = router;