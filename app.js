var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render("index");
});

app.get('/:time', function(req, res){
    let input = req.params.time;
    let unix;
    let natural;
    if(input == parseInt(input)){
        unix = parseInt(input);
        natural = unixToNormal(input);
    } else if(Date.parse(input)) {
        unix = Date.parse(input)/1000,
        natural = unixToNormal(unix);
    } else {
        unix = null,
        natural = null
    }
    let timeStamp = {
        unix: unix,
        natural: natural
    }
    res.json(timeStamp)
});

app.listen(3000, function(){
    console.log("App is listening on port 3000!");
});

//Utility functions
let unixToNormal = function(input) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];
    let date = new Date(input*1000);
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let day = date.getDate();
    return month + " " + day + ", " + year;
}