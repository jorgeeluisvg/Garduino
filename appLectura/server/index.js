//Servidor requerimientos xpress
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

//socketio
const io = require('socket.io')(server);
//html ruta
app.use(express.static(__dirname + '/public'));

server.listen(3000, function(){
    console.log("server en puerto: 3000");
})

//arduino serial port reading
const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;


//inicializar lectura serial port arduino
const port = new Serialport('COM7',{
    baudRate: 9600
})

const parser = port.pipe(new Readline({ delimeter: '\r\n'}));

parser.on('open', function(){
    console.log('Conexion exitosa');
})


parser.on('data', function(data) {
    let temp = parseInt(data, 10) + " C";
    console.log(temp)
    io.emit('temp', data);
})

port.on('error', function() {
    console.log(err);
})


//Sockets iniciar funciones
io.on('connection', function (socket) {

    socket.on('pl1', function (){
      console.log("Temperatura en planta 1: ");
      getp1();
    });

    
    socket.on('pl2', function (){
      console.log("Apagar ");
      getp2();
    });
   
  });


  function getp1(){
    console.log("planta 1")
    port.write('1')
}

function getp2(){
  console.log("planta 2")
  port.write('2')
}

  function ondear(){
    setTimeout(() => {
        console.log("Bomba apagada")
        motorcito.off();
      }, 8000);
}

  