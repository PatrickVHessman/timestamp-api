//jshint esversion:6
const express = require('express');

const app = new express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/timestamp/', function (req, res) {
    let date = new Date();
    let dateObject = {
        unix: date.getTime(),
        utc: date.toUTCString()
    };
  res.send(dateObject)
});

app.get('/api/timestamp/:date', function (req, res) {
    const numCheckPattern = /^[0-9]*$/;
    let date_string = req.params.date;
    let date = new Date(date_string);
    let dateObject;
    if (numCheckPattern.test(date_string)) {
        const unixNum = Number(date_string);
        const unixDate = new Date(unixNum);
        dateObject = {
        unix: unixDate.getTime(),
        utc: unixDate.toUTCString()
        }
    }
    else if (date.toDateString() === "Invalid Date") {
        dateObject = {
            error: "Invalid Date"
        }
    }
    else {
        dateObject = {
        unix: date.getTime(),
        utc: date.toUTCString()
    };
    }
  res.send(dateObject)
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening at http://localhost:${port}`)
});