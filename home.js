var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.get('/getColumnData/', function (req, res) {
    var data={
        "isDistinct": false,
        "isNum": false,
        "min": null,
        "max": null,
        "frequency": {
            "10": "100",
            "cookies": 60,
            "google": 100,
            "site": 30,
            "text": 40,
            "read": 60,
            "more": 70
    },
        "isCountry": true
    };
    res.send(data);
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});