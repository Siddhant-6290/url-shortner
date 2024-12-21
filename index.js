const express= require("express");

const path=require('path');
const urlRoute=require("./routes/url");
const {connectToMongoDB}=require("./connection");
const staticRoute=require("./routes/StaticRouter");
const userRoute=require("./routes/user");
const cookieParser=require('cookie-parser');
const {restrictToLoggedinUserOnly,checkAuth}=require('./middleware/auth');

const URL=require('./models/url');

const app=express();
const PORT=8001;



connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log('MongoDb connected'));
console.log("hello from")
app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// app.get("/test",async (req,res)=>{
//     const allUrls = await URL.find({});
//     return res.render("home",{
//         urls:allUrls,
//     });
// });


app.use("/url",restrictToLoggedinUserOnly,urlRoute);

app.use('/',checkAuth,staticRoute);
app.use('/user',userRoute);




app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
  const entry=  await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        },
    },
},
{ new: true }
);

if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
}


res.redirect(entry.redirectURL);

});





app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));