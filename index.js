// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

console.log('date api');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api", function(req, res, next) {
  console.log(req.params);
  req.time = new Date().toUTCString();
 
  let unix = new Date(req.time).valueOf();
  res.json({"unix": unix, "utc":  req.time});
  console.log("api");
  res.json({json: "api"});
//  console.log("get to /api, params: ",req.params);
}
        );

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.use("/api/:date", function (req, res) {
  console.log("inside /api/:date");
  console.log("use",req.params);
  let date_string = req.params.date;
  let date_string_s = new Date(parseInt(date_string)).toUTCString();
  console.log("type of date_string: ", typeof date_string);
  console.log("length", date_string.length)
  console.log("is invalid date?: ",Date(date_string));
  if(date_string_s == 'Invalid Date'){
    res.json({error:date_string_s});
  }
  else{
  if(date_string.length == 13 ) {
    let date_string_time = new Date(parseInt(date_string)).toUTCString();
    console.log("from unix to utc: ",date_string_time);
// date_string_time.toUTCString();
    let unix_date = date_string;
  res.json({unix: parseInt(date_string), utc: date_string_time});
  
  }
 // Date(date_string).toUTCString();
 // res.json({date:})
  else {
    let dates_utc = new Date(date_string);

  let unix = new Date(date_string).valueOf();
    console.log("unix time ",unix);
    
    
    console.log("utc",dates_utc)
  res.json({unix: unix, utc:  dates_utc.toUTCString()});
  }
    }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


