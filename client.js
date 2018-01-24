const net = require('net')

//creates new socket when terminal window is opened
const socket = new net.Socket();
socket.connect(6969,'0.0.0.0',function(){
  //dataout
  process.stdin.pipe(socket);
  //data in
  socket.pipe(process.stdout);

});

socket.on('end',function(){
  console.log('connection ended')
})




// //how to write to terminal
// process.stdout.write('hello \n\n\n\n\n');