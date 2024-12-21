const express=require("express");
const URLs=require("../models/url");
const router=express.Router();

router.get('/',async(req,res)=>{
    // const allurls= await URLs.find({});

    if(!req.user) return res.redirect('/login');

    // const allurls= await URLs.find({createdBy: req.user._id});
    const allurls = await URLs.find({ createdBy: req.user._id });

    
    
    return res.render("home",{
        urls:allurls,
    });
    
});


router.get("/signup",(req,res)=>{
    return res.render("signup");
})

router.get("/login" , (req,res)=>{
    return res.render("login");
});




module.exports= router;