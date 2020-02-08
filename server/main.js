var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mensajes = [{
    id:0,
    text:"Servidor Iniciado",
    autor:"Server"
}]

app.use(express.static('public'));

app.get('/', (req,res) =>{
    res.setMaxListeners(200).send("Hola Mundo!");
})

io.on('connection',function(socket){
    console.log('Alguien se ha conectado con Sockets')
    socket.emit('messages',mensajes);

    socket.on('NewMessage', (data) =>{
        mensajes.push(data);

        io.sockets.emit('messages',mensajes);
    });
});



server.listen(2000, () => {
    console.log("Servidor funcionando");
});