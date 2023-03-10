// 126325db54         // List Id
//   0de1ff84c91a844a9879982fc95b4651-us14    // Api id
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) =>{
    console.log(__dirname + "/")
   res.sendFile(__dirname + "/singup.html")
} )

app.post("/" , (req,res) => {
    var FirstName = req.body.Fname;
    var LastName = req.body.Lname;
    var EmailAdress = req.body.Email;

    var data = {
        members : [{
            email_address : EmailAdress,
            status : "subscribed",
            merge_fields:{
                FNAME :FirstName,
                LNAME: LastName
            }
        }]
    }

    var jsonData = JSON.stringify(data);
    var url = "https://us14.api.mailchimp.com/3.0/lists/126325db54";
    const option = {
        method :"POST",
        auth : "Harsh:0f74e573fb62c3dc4391655b8945732f-us14"
    }
    const request = https.request(url,option,(response)=>{
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

})
const port = process.env.PORT || 5000;
app.listen(port , ()=>{
    console.log("Server running on Port : 5000");
})
