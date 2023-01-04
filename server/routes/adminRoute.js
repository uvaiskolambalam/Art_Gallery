const express = require('express')
const router = express.Router()
const User = require("../models/userModel");
const UserPost = require("../models/postModel");
router.get('/getAllUsers', async (req, res) => {
    try {
        
        const users = await User.find({})
        res.status(200).json(users)
       // console.log(users,'adminUsers');
    } catch (error) {
        
    }
})
router.get('/getAllPosts', async (req, res) => {
    try {
        console.log("vannu");
        const posts = await UserPost.find().populate('userId' ,'user_name profileImage email block')
        .sort({createdAt:-1});
     
 
       
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
    }
})
router.patch('/updateBlock', async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        console.log(user,'before');
        user.block = !user.block
        await user.save()
        res.status(200).json({success:true})
    } catch (error) {
        console.log(error);
    }
})
router.patch('/blockPost', async(req, res) => {
    console.log('hhhhh');
    try {
        const posts = await UserPost.findOne({ _id: req.body.postId })
        console.log(posts,'before');
        posts.block = !posts.block
        await posts.save()
        res.status(200).json({success:true})
    } catch (error) {
        res.status(400).json({success:false})

        console.log(error);
    }
})


module.exports = router;