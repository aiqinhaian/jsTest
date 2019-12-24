const http = require('http')
var crypto = require("crypto");
const websocket = require('./socket.js')
const websocket2 = require('./socket_v2.js')

const server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
})
server.listen(12010)

// websocket.upgrade(server, function() {
//   console.log('升级成功')
//   setInterval(function () {
//     websocket.brocast('服务器端发送数据成功')
//   }, 10000)
// })

server.on('upgrade', function(req, socket, upgradeHead) {
  var key = req.headers['sec-websocket-key'];
  key = crypto.createHash("sha1").update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest("base64");
  var headers = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    'Sec-WebSocket-Accept: ' + key
  ];
  socket.setNoDelay(true);
  socket.write(headers.join("\r\n") + "\r\n\r\n", 'ascii');

  var ws = new websocket2(socket);

  // 每次简历新的连接时，广播通知当前连接数
  ws.brocast("man:" + ws.connectLength)

  setInterval(function () {
    ws.send('服务器端发送数据成功')
  }, 10000)
});