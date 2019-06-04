var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("<h1>Hello world</h1>");
});
app.get("/name/:anun", function(req, res){
   var anun = req.params.anun;
   res.send("<h1>Hello " + anun +"</h1>");
});
app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
