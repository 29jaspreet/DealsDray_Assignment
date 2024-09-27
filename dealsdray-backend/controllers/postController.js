const Post = require('../models/postModel')
const createPost =async(req ,resp)=>{
try {
   const post= new Post({
        name:req.body.name,
        email:req.body.email,
        image:req.file.filename,
        phone:req.body.phone,
    });
    const postData =await post.save();
    resp.status(200).send({success:true ,msg:'Post Data',data:postData})
} catch (error) {
    resp.status(400).send({success:false ,msg:error.message});
}
}
module.exports={
    createPost
}