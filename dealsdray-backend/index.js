const express =require("express");

const cors = require("cors");
require('./db/config');
const User = require("./db/User")
const product =require("./db/Employee")
const app = express();

const post_route= require('./routes/PostRoute');
app.use(post_route);
// Middlewares
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));






//  this is the registeration api 
app.post("/register",async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
      result = result.toObject();
    delete result.password;
    resp.send(result);

  
   

});


// login api 

app.post("/login" , async(req,resp)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            resp.send(user);
        }else{
            resp.send({result:"No user found"})
        }
    }else{
        resp.send({result:"No user found"})

    }
 
})

// adding api

app.post("/addme",async(req,resp)=>{
    let Product = new product(req.body);
    let result = await Product.save();
    resp.send(result);
});


// listing api

app.get("/list", async (req, resp)=>{
    // ye .find() function products vali collection se sare data ko lega aur products vale variable mein daal dega
    let products = await product.find();
    if(products.length>0){
        resp.send(products)
    }else{
        resp.send({result:"No products foound"});
    }
});

// delete api

app.delete('/delemployee/:id', async(req, resp)=>{
    const result =await product.deleteOne({_id:req.params.id});
    resp.send(result);

})


//  getting data to be updated

app.get("/upemployee/:id", async(req,resp)=>{
    let result = await product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"No record found"})
    }

})

// update api
app.put("/upemployee/:id", async(req, resp)=>{
    let result = await product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    resp.send(result);
})


// making a api route for searching 

app.get("/search/:key" , async(req, resp)=>{
    let result = await product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {email:{$regex:req.params.key}},
            

        ]
    });
    resp.send(result);
})


app.listen(5000);