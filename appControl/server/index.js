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
    console.log("*----------------------*");
    console.log("|server en puerto: 3000|");
    console.log("*----------------------*");
})

//Arduino johntfive control
var cinco = require("johnny-five");
var circuito = new cinco.Board({ port: "COM3" });

circuito.on("ready", yep);

//Sockets iniciar funciones
io.on('connection', function (socket) {

    socket.on('rm', function (){
      console.log("Riego manual activado P1");
      prender();
    });

    socket.on('rm1', function (){
      console.log("Riego manual activado P2");
      prender1();
    });
  
    socket.on('rm2', function (){
      console.log("Riego manual activado P3");
      prender2();
    });
  
    socket.on('rm3', function (){
      console.log("Riego manual activado P4");
      prender3();
    });
   
  });


function prender(){
  valvula = new cinco.Led(8);
  bombi = new cinco.Led(7);

  console.log("Bomba encendida")
  valvula.off(); 
  bombi.off();
  ondear();
}

function prender1(){
  motorcito1 = new cinco.Led(7);
  console.log("r1 encendida")
  motorcito1.off(); 
  ondear1();
}

function prender2(){
  motorcito2 = new cinco.Led(4);
  console.log("r2 encendida")
  motorcito2.off(); 
  ondear2();
}

function prender3(){
  motorcito3 = new cinco.Led(4);
  console.log("Bomba encendida")
  motorcito3.off(); 
  ondear3();
}

function ondear(){
    setTimeout(() => {
      
        console.log("Bomba apagada p1")
        valvula.on();
        bombi.on();
       
      }, 4000);
     
}

function ondear1(){
  setTimeout(() => {
      console.log("Bomba apagada p2")
      valvula.on();
      bombi.on();
    }, 4000);
}

function ondear2(){
  setTimeout(() => {
      console.log("Bomba apagada p3")
      motorcito2.on();
    }, 4000);
}

function ondear3(){
  setTimeout(() => {
      console.log("Bomba apagada p4")
      motorcito3.on();
    }, 4000);
}

function yep(){
  console.log("Conexion Exitosa")
  
} 

  
