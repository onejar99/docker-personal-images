const express = require('express');
const SocketServer = require('ws').Server;
const ChatServer = require('./ChatServer');

const WS_PORT = 80; // 3000;

let REDIS_HOST = process.env.REDIS_HOST;
let REDIS_PORT = process.env.REDIS_PORT;
console.log("env REDIS_HOST=", REDIS_HOST);
console.log("env REDIS_PORT=", REDIS_PORT);
//REDIS_HOST = "my-redis-cluster-not-clsmode.46vegk.ng.0001.use1.cache.amazonaws.com";
//REDIS_PORT = 6379;
//REDIS_HOST = "localhost";
//REDIS_PORT = 16379;

// create express object, bind & listen port
const app = express()
const server = app.listen(WS_PORT, () => console.log(`Listening on ${WS_PORT}`));

// health check api
app.get('/healthCheck', (req, res) => {
    res.send('Hello, I am good!');
});

// pass express to SocketServer to start WebSocket service
const wsServer = new SocketServer({ server })

const chatServer = new ChatServer(wsServer, REDIS_HOST, REDIS_PORT);
