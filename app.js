const express = require("express");
const bodyParser = require("body-parser");
const https = require("node:https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.post("/", function(req, res){
    var firstName = req.body.Firstname;
    var lastName = req.body.Lastname;
    var email = req.body.Email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fiels: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
// console.log(jsonData);
    const url = "https://usX.api.mailchimp.com/3.0/lists/{lists_id}"

    const options = {
        method: "POST",
        auth: "anjali:{API key}"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
    
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.get("/", function(req, res){
    // res.send("hello");
    res.sendFile(__dirname+"/signup.html");
});

app.listen(process.env.PORT || 3000, function(req, res){
    console.log("Server is running on port 3000");
});
