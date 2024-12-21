



const shortid = require("shortid");
const URL = require('../models/url');




// async function handleGenerateNewShortURL(req, res) {
//     const body = req.body;
    
//     // Validate input
//     if (!body.url) {
//         return res.status(400).json({ error: 'URL is required' });
//     }

//     // Generate a unique short ID
//     const shortID = shortid.generate();

//     // Save the short URL mapping in the database
//     await URL.create({
//         shortId: shortID,
//         redirectURL: body.url,
//         visitHistory: [],
//     });

//     // Return the generated short ID as a response
//     return res.json({ id: shortID });
// }



async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    console.log("Received body:", body); // Debugging input

    // Validate input
    if (!body.url) {
        console.error("Error: URL is required");
        return res.status(400).json({ error: 'URL is required' });
    }

    // Generate a unique short ID
    const shortID = shortid.generate();
    console.log("Generated shortID:", shortID); // Debugging shortID

    try {
        // Save the short URL mapping in the database
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
            // createdBy:req.user._id,
            createdBy: req.user._id,
        });
        console.log("Short URL saved successfully");
        // return res.json({ id: shortID }); // Respond with the short ID
        return res.render('home',{id: shortID});
    } catch (error) {
        console.error("Error saving to database:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}





async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result= await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });
}




module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};
