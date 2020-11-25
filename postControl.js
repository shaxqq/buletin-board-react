const PostModel = require('./postModel')

createPost = (req, res) => {
    const body = req.body
  //  console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error: 'Need add post',
        })
    }
    const post = new PostModel(body)
    //console.log(post)
    if(!post) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }
    post.save().then(()=>{
        res.status(201).json({
            success: true,
            id: post._id,
            message: 'Post created',
        })
    }).catch(error =>{
        return res.status(400).json({
            error,
            message: 'Post not created',
        })
    })
}

updatePost = async (req, res) => {
    const body = req.body
    if(!body){
        return res.status(400).json({
            success: false,
            error: 'Need provide update post'
        })
    }
    PostModel.findOne({ _id: req.params.id }, (err, post) => {
        if(err){
            return res.status(404).json({
                err,
                message: 'Post not found',
            })
        }
        post.city = body.city
        post.title = body.title
        post.content = body.content
        post.save().then(()=>{
            res.status(200).json({
                success: true,
                id: post._id,
                mesage: 'Post updated',
            })
        }).catch(e => {
            return res.status(404).json({
                e,
                message: 'Post not updated',
            })
        })
    }) 
}

deletePost = async (req, res) => {
    await PostModel.findByIdAndDelete({_id: req.params.id}, (err, post) => {
        if(err){
            return res.status(400).json({
                success: false,
                error: err,
            })
        }
        if(!post){
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: post,
        })
    }).catch(err => console.log(err))    
}

getPostById = async (req, res) => {
    await PostModel.findOne({_id: req.params.id}, (err, post) => {
        if(err) {
            return res.status(400).json({
                success: false,
                error: err,
            })
        }
        if(!post){
            return res.status(404).json({
                success: false,
                error: 'Post not found',
            })
        }
        return res.status(200).json({
            success: true,
            data: post,
        })
    }).catch(err => console.log(err))
}

getPost = async (req, res) => {
    await PostModel.find({}, (err, post) => {
        if (err){
            return err.status(400).json({
                success: false,
                error: err,
            })
        }
        if(!post.length) {
            return res.status(404).json({
                success: false,
                error: 'Post not found',
            })
        }
        return res.status(200).json({
            success: true,
            data: post,
        })
    }).catch(err => console.log(err))
}
module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPostById,
    getPost,
}

