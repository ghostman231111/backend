const { validationResult } = require('express-validator');
const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
    Post.find().then(posts => {
        if (!posts) {
            const error = new Error('Could Not find posts');
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({
            posts
        })

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        throw error
    }
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imageUrl: 'image/1.png',
        creator: {
            name: 'Nikhil'
        }
    });
    post.save().then(result => {
        console.log(res)
        return res.status(201).json({
            post: result,
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });

}

exports.getPost = (req, res, next) => {
    const { postId } = req.params;
    Post.findById(postId).then(post => {
        if (!post) {
            const error = new Error('Could Not find post');
            error.statusCode = 404;
            throw error
        }

        res.status(200).json({
            post
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
}

