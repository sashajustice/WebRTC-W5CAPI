/*
 w5capi cdn server to serve w5capi.min.js files
*/

var express=require('express'),
    app=express(),
    http=require('http'),
    server=http.createServer(app);



app.use(express.static(__dirname+'/public'));


app.get('/w5capi',function(req,res){
    res.sendfile('public/w5capi.min.js');
});


server.listen(8080)
