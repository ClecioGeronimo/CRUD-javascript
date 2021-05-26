
const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))

router.post('/posts', controllers.createPost);
router.get('/posts', controllers.getAllPosts);
router.get('/posts/:postId', controllers.getPostById);
router.put('/posts/:postId', controllers.updatePost);
router.delete('/posts/:postId', controllers.deletePost);
router.post('/comments', controllers.createComment);
router.get('/comments', controllers.getAllComment);
router.get('/comments/:commentId', controllers.getCommentById);
router.delete('/comments/:commentId', controllers.deleteComment);
router.put('/comments/:commentId', controllers.putComment);

module.exports = router;