var http = require('http');
var cafecito = require('express');
var app = cafecito();

app.use(cafecito.static(__dirname + "/"));
app.get("/", inicio);

function inicio(peticion, request) {
    reuqest.render('index.html');
}

app.listen(3000);