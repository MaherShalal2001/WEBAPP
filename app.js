//jshint esversion: 6

const bodyParser = require('body-parser');
const express = require('express');
const request = require("request");
const https = require('https');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.post("/", function (req, res) {
    var first = req.body.fname;
    var second = req.body.sname;
    var mail = req.body.mail;
    var data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: first,
                    LNAME: second,
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    const url = 'https://us10.api.mailchimp.com/3.0/lists/0b75678197';
    const options = {
        method: "POST",
        auth: "mahershalal:3a08360877998aa58c1becbfd5602009-us10"
    };
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/public/success.html");
        } else {
            res.sendFile(__dirname + "/public/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000, function () {
    console.log("SERVER IS STEADY");
});
// apikey
// 614f7e7968267ac180b4a9f5f1304076-us18
//listid
//5f2c834509
