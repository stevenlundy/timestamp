var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var formatDate = function(date) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
};

app.get('/*', function (req, res) {
  // Remove opening / and decode URI characters
  var date;
  var dateParam = decodeURI(req.url.slice(1));
  if (isNaN(parseInt(dateParam, 10))) {
    // if a possible date string is sent in
    date = new Date(dateParam);
  } else {
    // if an integer is sent in
    date = new Date(parseInt(dateParam, 10) * 1000);
  }
  if (date.toString() === 'Invalid Date') {
    res.send({
      unix: null,
      natural: null
    });
  } else {
    res.send({
      unix: date.getTime()/1000,
      natural: formatDate(date)
    });
  }
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
})