var express = require('express');
var app = express();
var url = require('url');
// var request = require('request');
var adbs = require("ad-bs-converter");
// var nepali = require('neptoeng');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 9001));

// app.get('/', function(req, res){
//   res.send('It works as expected!');
// });



app.post('/dummy/', function(req, res){
  res.send(req.query);

});

app.post('/convert/adtobs/', function(req, res){

  // var year = req.param('year');
  // var month = req.param('month');
  // var day = req.param('day');

  // console.log(parsed_url)

  // var viewAdToBS = `${year}/${month}/${day}`;

  var viewAdToBS = req.body.text;
  console.log(viewAdToBS)
  // var responseAB = adbs.bs2ad(viewAdToBS);
  var responseAB = adbs.ad2bs(viewAdToBS);
  var ne = responseAB.en;
  res.send(`${ne.year}/${ne.month}/${ne.day}`);
  // res.send(req.query);

});
app.post('/convert/bstoad/', function(req, res){

  // var year = req.param('year');
  // var month = req.param('month');
  // var day = req.param('day');


  // var viewAdToBS = `${year}/${month}/${day}`;
  var viewAdToBS = req.body.text;
  var responseAB = adbs.bs2ad(viewAdToBS);
  // console.log(responseAB)
  // // var ne = responseAB.ne;
  // res.send(responseAB)
  res.send(`${responseAB.year}/${responseAB.month}/${responseAB.day}`);

});



app.post('/today/bs/', function(req, res){
  var today = new Date();
  var todayView = `${today.getFullYear()}/${(today.getMonth()+1)}/${today.getDate()}`;
  var responseAB = adbs.ad2bs(todayView);
  var ne = responseAB.ne;
  var proRespone = `${ne.year}/${ne.month}/${ne.day}`;
  var jsonResponse = {
    "response_type": "in_channel",
    "text": ":date: Today's nepali date is",
    "attachments": [
        {
            "text": proRespone
        }
    ]
  };
  // jsonResponse = JSON.parse(jsonResponse);
  res.json(jsonResponse);


});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
