const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { listen } = require('socket.io');
const formatMessage = require('./public/js/message');

// App Setup
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = 'Chat bot'

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}...`);
});

// Static files
app.use(express.static(path.join(__dirname, `public`)));


// Run when a client connects
io.on('connection', socket =>{
    console.log("New websocket connected...");

    // Welcome current user
    socket.emit('message', formatMessage(botName,'Welcome to Chat room!'));

    // Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chatroom'));

    // Runs when a client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chatroom'));
    })

    // Listen for chat messages
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USERNAME', msg))
    })

    // Braodcast to all users
    // io.emit();
    // Broadcast to all users except client connecting
    // socket.broadcast.emit();
    // emit to a single client
    // socket.emit();
})
