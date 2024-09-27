const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});


// mongoose.modle("collectionName" , SchemasName)
module.exports = mongoose.model("users", UserSchema) ;