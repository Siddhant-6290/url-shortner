const mongoose = require("mongoose")

const urlSchema= new mongoose.Schema({
   shortId:{
    type:String,
    required:true,
    unique:true,
   } ,
   redirectURL:{
    type:String,
    required:true,
   },
   visitHistory:[{timestamp:{type:Number}}],
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
   },

},
{timestamps:true}
);

// for model

// collection name-The first argument ("url") specifies the collection name.
// Mongoose automatically pluralizes it to urls in the database (you can override this behavior if needed).
//The second argument (urlSchema) is the schema definition that describes the structure of the documents in the collection.

const URL=mongoose.model("url",urlSchema);
module.exports=URL;


// A model in Mongoose is a wrapper for the schema that
//  provides an interface to interact with the MongoDB collection. It allows you to:
// Perform CRUD operations (e.g., create, read, update, delete).
// Use built-in Mongoose methods for querying and validation.
// By creating the model (URL), you can directly interact with the MongoDB collection using the methods 
// provided by Mongoose (e.g., URL.find(), URL.create()).
