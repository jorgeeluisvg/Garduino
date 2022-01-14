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


/*------------Lectura app---------*/
//arduino serial port reading
const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;
//inicializar lectura serial port arduino
const port = new Serialport('COM3',{
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
/*------------Lectura app---------*/


//Arduino johntfive control
var cinco = require("johnny-five");
var circuito = new cinco.Board({ port: "COM6" });

circuito.on("ready", yep);

//Sockets iniciar funciones rm y lectura
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

    /*------SOCKETS LECTURA------*/
    socket.on('pl1', function (){
      console.log("Temperatura en planta 1: ");
      getp1();
    });

    
    socket.on('pl2', function (){
      console.log("Temperatura en planta 2: ");
      getp2();
    });

    socket.on('pl3', function (){
      console.log("Temperatura en planta 3: ");
      getp3();
    });
   
    socket.on('pl4', function (){
      console.log("Temperatura en planta 4: ");
      getp4();
    });
   
  });


function prender(){
  valvula = new cinco.Led(3);
  bombi = new cinco.Led(2);

  console.log("Bomba encendida")
  valvula.off(); 
  bombi.off();
  ondear();
}

function prender1(){
  valvula1 = new cinco.Led(4);
  bombi = new cinco.Led(2);
  console.log("r1 encendida")
  bombi.off(); 
  ondear1();
}

function prender2(){
  valvula2 = new cinco.Led(5);
  bombi = new cinco.Led(2);
  console.log("r2 encendida")
  valvula2.off(); 
  ondear2();
}

function prender3(){
  valvula3 = new cinco.Led(6);
  bombi = new cinco.Led(2);
  console.log("Bomba encendida")
  valvula3.off(); 
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
      valvula1.on();
      bombi.on();
    }, 4000);
}

function ondear2(){
  setTimeout(() => {
      console.log("Bomba apagada p3")
      valvula2.on();
      bombi.on();
    }, 4000);
}

function ondear3(){
  setTimeout(() => {
      console.log("Bomba apagada p4")
      valvula3.on();
      bombi.on();
    }, 4000);
}

function getp1(){
  console.log("planta 1")
  port.write('1')
}

function getp2(){
console.log("planta 2")
port.write('2')
}

function getp3(){
console.log("planta 3")
port.write('3')
}

function getp4(){
console.log("planta 4")
port.write('4')
}

function yep(){
  console.log("Conexion Exitosa")
  
} 

  