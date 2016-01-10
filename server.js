var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var formatDate = function(date) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
};

var getTimeStamp = function(dateString) {
  var date;
  if (isNaN(parseInt(dateString, 10))) {
    // if a possible date string is sent in
    date = new Date(dateString);
  } else {
    // if an integer is sent in
    date = new Date(parseInt(dateString, 10) * 1000);
  }
  if (date.toString() === 'Invalid Date') {
    return {
      unix: null,
      natural: null
    };
  } else {
    return {
      unix: date.getTime()/1000,
      natural: formatDate(date)
    };
  }
};

app.get('/*', function (req, res) {
  // Remove opening / and decode URI characters
  var dateParam = decodeURI(req.url.slice(1));
  return getTimeStamp(dateParam);
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
})