const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');



mongoose.connect('connect your local mongoDb database');

const homeStartingContent = "If you have already reached major milestones in your life, you can write journal ideas about those events. It could be a detailed recollection of your wedding day, the feeling you had when your child was born, your experience at a rally that you attended, or another unforgettable event. You can also write about specific events in the lives of others.";



const app=express();



app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));   



const postSchema = new mongoose.Schema({
    title:String,
    content:String
});



const Post = new mongoose.model("Post",postSchema);


app.get("/",function (req,res) {
    
    Post.find({},function(err,posts) {

        res.render("home",{
            startingContent:homeStartingContent,
            posts: posts
        });    
    });
});



app.get("/compose",function (req,res) {
    res.render("compose");
    
});

app.post("/compose",function (req,res) {
  
    const post = new Post( {
    title:req.body.postTitle,
    content:req.body.postFile
   });
  
   post.save(function(err) {
       if(!err){
        res.redirect("/")
       }
       
   });
});

app.get("/posts/:postId",function (req,res) {

    
    const requestedId=req.params.postId;

    Post.findById(requestedId,function (err,post) {

        res.render("post",{
            title:post.title,
            content:post.content
        });
        
    });
    
});



app.listen(3000,function() {

    console.log("Server is running on port 3000");
    
});