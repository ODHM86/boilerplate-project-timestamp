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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.use("/api/:date", function (req, res) {
  console.log("use",req.params);
  let date_string = req.params.date;
  
  console.log("length", date_string.length)
  if(date_string.length == 13 ) {
    let date_string_time = new Date(date_string*1000);
    console.log(date_string_time);
 date_string_time.toUTCString();
    let unix_date = date_string;
  res.json([{unix: date_string},{date: date_string_time.toUTCString()}]);
  
  }
 // Date(date_string).toUTCString();
 // res.json({date:})
  else {
    let dates_utc = new Date(date_string);

  let unix = new Date(date_string).valueOf();
    console.log("unix time ",unix);
    
    let dates_
    console.log("utc",dates_utc)
  res.json([{date: dates_utc.toUTCString()},{unix: unix}]);
  }
});

app.get("/api"), function(req, res, next) {
  console.log("get to /api, params: ",req.params);
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


