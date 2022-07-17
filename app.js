const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.listen(process.env.PORT,function(){
    console.log("Server is set-up.");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(request,response){
    console.log(request.body.email);
const Fname = request.body.Fname;
const Lname = request.body.Lname;

const email = request.body.email;

var data = {
members:[{
    email_address : email,
    status : "subscribed",
merge_fields:
    {
        FNAME:Fname,
        LNAME:Lname
    }

}
]

};

const data1 = JSON.stringify(data);

const url = "https://us18.api.mailchimp.com/3.0/lists/f1c67c88fd";
const options = {
method:"POST",
auth:"Amit:2c4f61aa03ebe5fb2c203d29055386c0-us18"
}
const request1 = https.request(url,options,function(){
    if(response.statusCode === 200){
        response.sendFile(__dirname+"/success.html");
    }
    else{
        response.sendFile(__dirname+"/failure.html");
    }
response.on("data",function(data){
    console.log(JSON.parse(data));
    
    
})
})


request1.write(data1);
request1.end();
});

//2c4f61aa03ebe5fb2c203d29055386c0-us18

//list id
//f1c67c88fd

app.post("/failure.html",function(requ,resp){
resp.redirect("/");
});



