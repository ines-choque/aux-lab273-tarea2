var dgram = require('dgram');
var server = dgram.createSocket("udp4");

server.on("message", function (msg, client) {
    var sep,usu,pas,err1,bie, nom;
    
    console.log("Se conecto "+msg);
    // recibe lo que escribio el cliente
    //busco la pocicion del separador /
    sep =msg.indexOf("/");
    usu=msg.slice(0,sep-1);
    pas=msg.slice(sep+1,msg.length);
    err1="0";bie="0";
    if(usu=='dcopalupe')        { if (pas=='123456') {bie="1";nom= 'Dan Israel Copa Lupe'; }else err1="2"; }
    if (usu=='jalanocaquino')   { if (pas=='1q2w3e4') {bie="1";nom= 'Jorge Andres Alanoca Quino';}else err1="2"; }
    if (usu=='acondoriquispe')  { if (pas=='54321') {bie="1";nom= 'Ana Condori Quispe'; }else err1="2"; }
    if(pas=='123456')        { if (usu=='dcopalupe') {bie="1";nom= 'Dan Israel Copa Lupe';} else err1="1"; }
    if (pas=='1q2w3e4')   { if (usu=='jalanocaquino') {bie="1";nom= 'Jorge Andres Alanoca Quino';}else err1="1"; }
    if (pas=='54321')  { if (usu=='acondoriquispe') {bie="1";nom= 'Ana Condori Quispe';} else err1="1"; }

    const ans = '';
    if (bie=="1")  {ans='Bienvenido '+nom+" !!!!!";}
    if (err1=="1")  {ans="El usuario "+usu+" es incorrecto o no existe. ---Ingrese usuario y contraseña (user/pass)";}
    if (err1=="2")  {ans="La contraseña para "+usu+" es incorrecto. ---Ingrese usuario y contraseña (user/pass)";}
    if (bie=="0"&&err1=="0")  ans="El usuario y contraseña no existe";

    console.log('Cliente conectado',msg);
    server.send(ans, 0, ans.length, client.port, client.address, function(){ console.log('Se envio el mensaje');});
});

server.on('listening', function () {
    const address = server.address();
    console.log('Servidor corriendo en puerto : '+ address.port);
});

server.bind(3000);