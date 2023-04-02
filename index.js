const express = require("express");
const { Socket } = require("socket.io");
const app = express()
const path = require("path");

const io = require("socket.io")(5556);

let users={};

app.use("/static",express.static(path.join(__dirname,"./static")));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./index.html"));
});

app.listen(5555,'127.0.0.1',()=>{
    console.log(`http://127.0.0.1:${5555}`);
})

io.on('connection',(socket)=>{
    socket.on('new-user-joined',(name)=>{
        users[socket.id]=name;
      //  console.log(name,'joined room.');
        socket.broadcast.emit('user-joined',name); //broadcast
    });

    socket.on('send',message=>{
        console.log("name : ",users[socket.id],message);
        socket.broadcast.emit('receive',{msg:message,name:users[socket.id]});
    });

    socket.on('disconnect',(data)=>{
        socket.broadcast.emit('user-left',`${users[socket.id]} has left `);
        delete users[socket.id];
    })
})
