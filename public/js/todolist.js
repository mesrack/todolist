/**
 * Script JavaScript and jQuery (client)
 * 
 * @author : Ferrandez Loïc
 * 
 * @version : 0.1.0
 */
var socket = io.connect('http://localhost:8080');


// clear the list and display the new todolist
socket.on('todolist', function(todolist){

    $('#todolist').empty();

    if( typeof todolist !== 'undefined' && todolist.length > 0) {

        todolist.forEach(function(value, index) {
            
            displayTask(index, value);
        });
    }
});

// Display the last task added
socket.on('newTask', function (data) {

    displayTask(data.index, data.task);
})

// Delete selected task
$('body').on('click', '.deleteTask', function() {

    socket.emit('deleteTask', $(this).data('index'));
})

// send the new task on server for adding
$('#form-newTask').submit(function(event) {
    
    socket.emit('addTask', $('#newTask').val());

    $('#newTask').val("").focus();

    event.preventDefault();
})


function displayTask (index, task) {

    $('#todolist').append('<li><a class="deleteTask" href="#" data-index="' + index + '">✘</a>' + task + '</li>');
};