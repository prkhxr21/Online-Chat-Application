const socket= io('http://localhost:5500');

const name= prompt("Enter your name to join");
socket.emit('new-user-joined',name);

const form= document.getElementById('send-msg');
const msginput= document.getElementById('msgInput');
const msgcontainer= document.querySelector(".container");   

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position); 
    msgcontainer.append(messageElement);
}




socket.on('user-joined', name=>{
    append(`${name} joined the chat!`,'right')
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left', name=>{
    append(`${name} left the chat.`,'right')
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message=msginput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msginput.value= '';
})