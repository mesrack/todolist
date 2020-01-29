/**
 * Server file
 * 
 * @author : Ferrandez Loïc
 * @version : 0.1.0
 * 
 * @description : Create a new todolist in realtime using sockets.io.
 * 
*/

var express = require('express'); // load Express framework
var app = require('express')(); // Create application
var server = require('http').createServer(app); // Create server with http module
var ent = require('ent'); // load security module as PHP htmlentities
var io = require('socket.io').listen(server); // load socket

var todolist = []; // Create an array for store the tasks on server

// Use public folder for JS file
app.use(express.static('public'))

// Loading the index.html file displayed to the client
.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
})

// Redirect path if wrong page is called
.use(function(request, response, next)
{
    response.redirect('/');
});



// Manage the data exchange with sockets
io.sockets.on('connect', function(socket) {

    // Display the todolist when a new client is connected
    socket.emit('todolist', todolist);

    // Collect the new task and add on todolist
    socket.on('addTask', function(task) {

        var newTask = ent.encode(task);

        todolist.push(newTask);

        io.emit('newTask', {task: newTask, index: (todolist.length-1)})
    });

    // Delete selected task by index
    socket.on('deleteTask', function(index) {

        todolist.splice(index, 1);

        io.emit('todolist', todolist);
        
    })
})


server.listen(8080);