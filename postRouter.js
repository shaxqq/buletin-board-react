const express = require('express');

const postContr = require('./postControl')
const router = express.Router()

router.post('/post', postContr.createPost)
router.put('/post/:id', postContr.updatePost)
router.delete('/post/:id', postContr.deletePost)
router.get('/post/:id', postContr.getPostById)
router.get('/posts', postContr.getPost)

module.exports = router;