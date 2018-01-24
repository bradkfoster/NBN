const net = require('net');
let allSockets = [];

//creates server and sockets that can be connected
const server = net.createServer(function (socket) {

  socket.setEncoding('utf8');
  //verify when a cliet is connected
  console.log('Server: Client Connected');
  //writes to client when they connect

  socket.write('Please Enter UserName \n');


  allSockets.push(socket)

  socket.on('end', function () {
    console.log('client disconnected');
  })

  socket.on('data', function (data) {
    let info = data.toString();
    console.log(info);
    allSockets.filter(function(elem){
      return elem !==socket;
    }).forEach(function (socket) {
      socket.write(info);
    })


  });

}) //close createServer
server.on('error', function (err) {
  throw err;
});

server.listen(6969, '0.0.0.0', function () {
  console.log('you are connected');
});