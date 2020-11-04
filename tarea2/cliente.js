var dgram = require('dgram');
// var mensaje = 'Dan';
var client = dgram.createSocket("udp4");
console.log("Bienvenido al sistema LAB 273");
console.log("Ingrese usuario y contraseña (user/pass)");
//ingresa el usuario y password del cliente
const readline = require('readline');

const rl = readline.createInterface({
    
    input: process.stdin,
    output: process.stdout
});

client.on('message', function (msg){
    console.log(msg.toString());
    // client.close();
    
});

rl.on('line', function (mensaje) {
    // console.log('Escribe tu nombre: ');
    // console.log('Enviamos'+mensaje);
    if(mensaje == 'salir'){
        client.close();
        rl.close();
    }else{
        client.send(mensaje,0,mensaje.length,3000,'localhost', function (err, bytes){});
    }
    // rl.close();
});

// rl.on('close', function(){
//     client.close();
// });

client.on('close', function (){
    console.log('desconectado del servidor');
});