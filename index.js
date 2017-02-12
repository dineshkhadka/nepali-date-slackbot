var express = require('express');
var app = express();
var url = require('url');
var adbs = require("ad-bs-converter");

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('port', (process.env.PORT || 9001));

var regex = /\d+\/\d+\/\d+/;

app.post('/convert/adtobs/', function(req, res) {
    var viewAdToBS = req.body.text;
    if (viewAdToBS.match(regex)) {

        var responseAB = adbs.ad2bs(viewAdToBS);
        var ne = responseAB.ne;
        var output = `${ne.year}/${ne.month}/${ne.day}`;
        var jsonResponse = {
            "response_type": "ephemeral",
            "text": ":date: The Date converted to AD is",
            "attachments": [{
                "text": output
            }]
        };


        res.json(jsonResponse);
    } else {
        res.send(':warning: Please use YYYY/MM/DD')
    }
    // res.send(req.query);

});
app.post('/convert/bstoad/', function(req, res) {
    var viewBSToAD = req.body.text;
    if (viewBSToAD.match(regex)) {
        var responWithBS = adbs.bs2ad(viewBSToAD);
        var output = `${responWithBS.year}/${responWithBS.month}/${responWithBS.day}`;
        var jsonResponse = {
            "response_type": "ephemeral",
            "text": ":date: The Date converted to BS is",
            "attachments": [{
                "text": output
            }]
        };
        res.json(jsonResponse);
    } else {

        res.send(':warning: Please use YYYY/MM/DD')
    }

});



app.post('/today/bs/', function(req, res) {
    var today = new Date();
    var todayView = `${today.getFullYear()}/${(today.getMonth()+1)}/${today.getDate()}`;
    var responseWithBSToday = adbs.ad2bs(todayView);
    var ne = responseWithBSToday.ne;
    var proRespone = `${ne.year}/${ne.month}/${ne.day}`;
    var jsonResponse = {
        "response_type": "ephemeral",
        "text": ":date: Today's nepali date is",
        "attachments": [{
            "text": proRespone
        }]
    };
    res.json(jsonResponse);


});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});