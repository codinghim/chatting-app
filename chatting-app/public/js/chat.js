const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

// Get username and room for URL
const {username} = QS.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(username);

// Make connection
const socket = io();

// Receive messages from server(socket)
socket.on('message', message =>{
    console.log(message);
    outputMessage(message);

    //Scroll down every time
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// Message submit
chatForm.addEventListener('submit', (e) => {

    //To prevent sending form to file
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emitting a message to server
    socket.emit('chatMessage', msg);

    // clear input after message sent
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    chatMessages.appendChild(div);
}