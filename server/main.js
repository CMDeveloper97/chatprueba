var express = require('express');
var app = express();
var https = require('https');
const fs = require('fs');

const secureServer = https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
    }, app);

var io = require('socket.io')(secureServer);

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



secureServer.listen(2000, () => {
    console.log("Servidor funcionando");
});

