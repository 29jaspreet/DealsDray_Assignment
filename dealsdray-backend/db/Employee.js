const mongoose = require('mongoose');

// sbse pehle humne mongoose ko import kiya hai

// uske baad humne schemas bnayae hai  .. schemas ke andr vo fields hoti hai jo database ke andr humne dalni hoti hai

const EmployeeSchema = new mongoose.Schema({
name: String,
email:String,
phone:String,
course:String,
gender:String,
designation:String
});

module.exports = mongoose.model("produt",EmployeeSchema);