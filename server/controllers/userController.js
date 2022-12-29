const User = require("../models/userModel");
const UserPost = require("../models/postModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userHelpers = require("../../server/helpers/userHelpers");
const { response } = require("express");
const { default: mongoose } = require("mongoose");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const userExist = await User.findOne({ email: req.body.email });

      if (userExist) {
        return res
          .status(200)
          .json({ message: "user Alredy Existed", success: false });
      } else {
        userHelpers.doSMS(req.body).then((response) => {
          if (response.smsError) {
            res.status(401).json({ message: "not", success: false });
          } else {
            res.status(200).json({ message: "redirect to otp", success: true });
          }
        });
      }
    } catch (error) {}
  },
  otp: async (req, res, next) => {
    try {
      userHelpers.otpVerify(req.body).then(async (response) => {
        if (response.varificeationError) {
          res
            .status(400)
            .json({ message: "OTP varification failed", success: false });
        } else {
          // res.status(200).json({message:'success',success:true})
          const userData = req.body.location.state;

          const password = userData.password;
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          userData.password = hashedPassword;
          const new_user = new User(userData);
          await new_user.save();

          const user = await User.findOne({ email: userData.email });

          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          res
            .status(200)
            .json({
              message: "Your account created",
              success: true,
              token: token,
            });
        }
      });
    } catch (error) {}
  },
  login: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .json({ message: "Password is incorrect", success: false });
    } else {
      const user = await User.findOne({ email: req.body.email });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({
        message: "Login Successfull",
        success: true,
        id: user._id,
        user_name:user.user_name,
        mobile:user.mobile,
        email:user.email,
        name: user.name,
        token: token,
        profile_pic: user.profile_pic,
        DOB:user.DOB,
        from:user.from,
        lives:user.lives,
        university:user.university,
        followers:user.followers,
        following:user.following,
        profileImage:user.profileImage
      });
    }
  },
  userInfo: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      if (!user) {
        return res
          .status(200)
          .json({ message: "User does not exist", success: false });
      } else {
        res
          .status(200)
          .json({
            success: true,
            data: { name: user.name, email: user.email },
          });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error getting user info", success: false, error });
    }
  },
  newPost: async (req, res, next) => {
    try {
      const postData = req.body;

      const newPost = new UserPost(postData);
      await newPost.save();
    } catch (error) {
      console.log(error);
    }
  },
  getPosts: async (req, res, next) => {
    try {
       const userId = req.params.id;
       const user=await User.findOne({_id:userId})

       const friendsPost = await UserPost.find({userId:user.following}).populate('userId' ,'user_name profileImage')
       .sort({createdAt:-1});
       const currentUserPost = await UserPost.find({userId:userId}).populate('userId' ,'user_name profileImage')
       .sort({createdAt:-1});

       const timeLinePost = friendsPost.concat(currentUserPost)
       //const a=timeLinePost
       console.log(timeLinePost, 'timeline');
       res.status(200).json({timeLinePost});
      // const followedUsers = await User.aggregate([
      //   {
      //     $match: {
      //       _id: new mongoose.Types.ObjectId(userId),
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "posts",
      //       localField: "following",
      //       foreignField: "userId",
      //       as: "followersPosts",
      //     },
      //   },
      //   {
      //     $project: {
      //       followersPosts: 1,
      //       _id: 0,
      //     },
      //   },
       
      // ]);

      // const timeLinePost = currentUserPost
      //   .concat(...followedUsers[0].followersPosts)
      //   .sort((a, b) => {
      //     return b.createdAt - a.createdAt;
      //   });
      //   console.log(timeLinePost,'timeLinePost');
      

     
    } catch (error) {}
  },
  handleLike: async (req, res, next) => {
    try {
      const likedPost = await UserPost.findOne({ _id: req.body.postId });

      const userLiked = await likedPost.likes.includes(req.body.userId);

      if (userLiked) {
        await UserPost.updateOne(
          { _id: req.body.postId },
          {
            $pull: {
              likes: req.body.userId,
            },
          }
        );

        res
          .status(200)
          .json({
            mesage: "disliked successfully",
            liked: false
          });
      } else {
        await UserPost.updateOne(
          { _id: req.body.postId },
          {
            $push: {
              likes: req.body.userId,
            },
          }
        );
        res.status(200).json({ mesage: "liked successfully", liked: true });
      }
    } catch (error) {}
  },
  addComment: async (req, res, next) => {
    try {
      const commentData = {
        userId: req.body.userId,
        desc: req.body.comment,
      };

      const user = await User.findOne({ _id: req.body.userId });

      commentData.userName = user.user_name;

      await UserPost.updateOne(
        { _id: req.body.postId },
        {
          $push: {
            comments: commentData,
          },
        }
      );

      res
        .status(200)
        .json({ mesage: "commented successfully", commented: true });
    } catch (error) {}
  },
  getUsers: async (req, res, next) => {
    try {
      console.log(req.body,'userIddddd');
      let userId=req.body.userId
      const allUsers = await User.find({followers:{$nin:userId}});
      //console.log(allUsers,'alllll');
      res.status(200).json({ success: true, users: allUsers });
    } catch (error) {}
  },
  getFriends:async (req,res,next)=>{
    try {
      let userId=req.body.userId
      const friends = await User.find({followers:userId})
     // res.json({friends:friends})
      res.status(200).json({ success: true, friends: friends });
     // console.log(friends);
    } catch (error) {
      
    }
  },
  follow: async (req, res, next) => {
    try {
      const userfollowing = await User.findOne({ _id: req.body.userId });
      const following = userfollowing.following.includes(req.body.followId);

      if (following) {
        await User.updateOne(
          { _id: req.body.userId },
          {
            $pull: {
              following: req.body.followId,
            },
          }
        );
        await User.updateOne(
          { _id: req.body.followId },
          {
            $pull: {
              followers: req.body.userId,
            },
          }
        );
        res
          .status(200)
          .json({ message: "unfollowing success", success: false });
      } else {
        await User.updateOne(
          { _id: req.body.userId },
          {
            $push: {
              following: req.body.followId,
            },
          }
        );
        await User.updateOne(
          { _id: req.body.followId },
          {
            $push: {
              followers: req.body.userId,
            },
          }
        );
        res.status(200).json({ message: "following success", success: true });
      }

    } catch (error) {}
  },
  editAbout:async(req,res,next)=>{
    try {
      console.log(req.body);
     
      const response=await User.updateOne({_id:req.body.userId},
        {
          $set:{
            user_name:req.body.data.user_name,
            email:req.body.data.email,
            mobile:req.body.data.mobile
          }
        })
        res.status(200).json({message:'edit success',success:true})
      
    } catch (error) {
      
    }

  },
  getUserDetails:async(req,res,next)=>{
    try {
      const user=await User.findOne({_id:req.params.id})
      res.status(200).json(user)
      console.log(user,'user');
    } catch (error) {
      
    }
  },
  editMoreData:async (req,res,next)=>{
    try {
      
      //console.log(req.body.DOB.getMonth(),'more dara');

      const response= await User.updateOne({_id:req.body.userId},
        {
          $set:{
            university:req.body.data.university,
            lives:req.body.data.lives,
            from:req.body.data.from,
            DOB:req.body.data.DOB
            
          }
        })
        res.status(200).json({message:'edit success',success:true})
    } catch (error) {
      
    }
  },
  profileImage:async(req,res,next)=>{
    try {
   const updated= await User.findOneAndUpdate({_id:req.body.userId},
        {
          $set:{
            profileImage:req.body.profileImage
        }
        },{new:true})
        console.log(response,'image url');
       res.status(200).json({success:true,updated})
    } catch (error) {
      
    }
  },
  getProfilePic:async(req,res,next)=>{
    try {
      console.log(req.body,'uvvu');
      const editProfileImage =await User.findOne({_id:req.body.userId})
      console.log(editProfileImage,'poda patti');
      res.status(200).json({message:'profile Photo updated successfully',success:true,editProfileImage})
    } catch (error) {
      
    }
  }
};
