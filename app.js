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
    const url = "https://us11.api.mailchimp.com/3.0/lists/bc5c3e5ce8"

    const options = {
        method: "POST",
        auth: "anjali:ad31b54840b83877e69d550c5a2f98db-us11"
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

//Mailchimp API key
//ad31b54840b83877e69d550c5a2f98db-us11

//audience ID
//bc5c3e5ce8

//"https://$API_SERVER.api.mailchimp.com/3.0/lists"