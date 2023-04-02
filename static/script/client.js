window.onload = () => {
    let send = document.getElementById("bmsg");
    let msg = document.getElementById("msg");
    let msgs = document.getElementsByClassName("msgs")[0];

    let audio = new Audio("/static/aud/receive.mp3");

    const socket = io('http://127.0.0.1:5556', { transports : ['websocket'] });

    
    const name = prompt("enter name : ");
    socket.emit('new-user-joined',name);


    socket.on('user-joined',(data)=>{
        let clientmsg = document.createElement("div");
        clientmsg.setAttribute("class", "server");
        clientmsg.innerHTML = `<span>${data} : joined Chat</span>`;
        msgs.appendChild(clientmsg);
    
    });

    socket.on('user-left',(data)=>{
        let clientmsg = document.createElement("div");
        clientmsg.setAttribute("class", "server");
        clientmsg.innerHTML = `<span>${data}</span>`;
        msgs.appendChild(clientmsg);
    
    });

    socket.on('receive',data=>{
        audio.play();
        recvMsg(data,msgs);
    })


    send.addEventListener("click",(evt)=>{
        sendMsg(msg.value,msgs,socket);
        msg.value='';
    });
}

const sendMsg = (msg,msgs,socket) => {
    if (msg =='') {
        alert("enter msg first");
    }
    else {
        let clientmsg = document.createElement("div");
        clientmsg.setAttribute("class", "client");
        clientmsg.innerHTML = `<span>${msg}</span>`;
        socket.emit('send',msg);
        msgs.appendChild(clientmsg);
    }
}

const recvMsg = (data,msgs) => {
        console.log(data);
        let clientmsg = document.createElement("div");
        clientmsg.setAttribute("class", "server");
        clientmsg.innerHTML = `<span>${data.name} : ${data.msg}</span>`;
        msgs.appendChild(clientmsg);
    
}