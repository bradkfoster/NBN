const net = require('net');
let allSockets = [];
let streaming = function(socket, message){
  return `${socket.username} : ${message}`
}

//creates server and sockets that can be connected
const server = net.createServer(function (socket) {

  socket.setEncoding('utf8');
  //verify when a cliet is connected
  console.log('Server: Client Connected');
  //writes to client when they connect
  socket.write('Please Enter UserName \n');
  socket.username = null;


  socket.on('data', function (data) {
    if (socket.username === null) {
      socket.username = data.toString();
      allSockets.push(socket);
    } else {
     console.log(allSockets.length);
      let info = data.toString();
      console.log(info);
      allSockets.filter(function (elem) {
        return elem !== socket;
      }).forEach(function (socket) {
        socket.write(streaming(socket,info));
      })
    }
  });

  socket.on('end', function () {
  allSockets.splice(allSockets.indexOf(socket,1));
  
    console.log('client disconnected');
  })

}) //close createServer
server.on('error', function (err) {
  throw err;
});

server.listen(6969, '0.0.0.0', function () {
  console.log('you are connected');
});