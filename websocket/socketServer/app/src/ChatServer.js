const chatUtil = require('./chat-util');
const redisUtil = require('./redis-util');

module.exports = class ChatServer {

    constructor(wsServer, redisHost, redisPort) {
        this.REDIS_PUBSUB_CHANNEL = "msgRelayChannel";

        this.roomDB = {}; // key=roomId1, value={memberConnUuid1=socketObj1, memberConnUuid2=socketObj2}
        this.wsServer = wsServer;
        this.redisHost = redisHost;
        this.redisPort = redisPort;
        this.redisClient = undefined;
        this.redisSubscriber = undefined;
        this.isPubSubMode = false;

        this.setupWsServerConnListener();

        if (redisHost && redisPort) {
            try {
                this.setupPubSub();
            } catch (err) {
                console.log("setupPubSub failed! error = ", err.message);
            }
        }
    }

    setupPubSub = async () => {
        console.log(`[setupPubSub] Redis Host=${this.redisHost}, Redis Port=${this.redisPort}`);
        this.redisClient = await redisUtil.getRedisClient(this.redisHost, this.redisPort);
        // fix [ErrorReply: ERR Can't execute 'publish': only (P)SUBSCRIBE / (P)UNSUBSCRIBE / PING / QUIT / RESET are allowed in this context]
        // when subscribe, the client is blocked, so need a stand-alone client.
        this.redisSubscriber = this.redisClient.duplicate();
        this.redisSubscriber.on('error', err => console.error(err));
        await this.redisSubscriber.connect();
        this.redisSubscriber.subscribe(this.REDIS_PUBSUB_CHANNEL, this.receiveRelay);
        this.isPubSubMode = true;
    }

    setupWsServerConnListener = () => {
        this.wsServer.on('connection', clientSocket => {
            // when: connected
            // console.log('clientSocket =', clientSocket);
            const connId = chatUtil.assignConnectionId(clientSocket);
            console.log('Client connected, connId = ' + connId);

            chatUtil.sendSysMsg(clientSocket, `Client socket connected (connId=${connId})`);

            // when: disconnect
            clientSocket.on('close', (code, reason) => {
                const connId = chatUtil.getClientConnId(clientSocket);
                console.log(`Close connected, code=[${code}], reason=[${reason}], connId=[${connId}]`);
                this.removeConn(clientSocket);
            })

            // when: receive message from client
            clientSocket.on('message', (data, isBinary) => {
                console.log('onmessage isBinary=', isBinary);
                console.log(data);
                if (!isBinary) {
                    data = data.toString();
                }
                console.log('onmessage data=', data);
                data = JSON.parse(data);

                this.handleAction(clientSocket, data);
            })
        })
    }

    publishRelay = (data) => {
        data = JSON.stringify(data);
        console.log(`publishRelay: channel=${this.REDIS_PUBSUB_CHANNEL}, ${data}`);
        this.redisClient.publish(this.REDIS_PUBSUB_CHANNEL, data);
    }

    receiveRelay = (message, channel) => {
        console.log(`Received message from channel ${channel}: ${message}`);
        message = JSON.parse(message);
        this.sendMsgToRoom(message.data.roomId, message.data.senderNickname, message.data.msg);
    }

    sendMsgToRoom = (roomId, senderNickname, msg) => {
        let members = this.roomDB[roomId];
        for(let connId in members) {
            let socket = members[connId];
            chatUtil.sendNormalMsg(socket, msg, senderNickname);
        }
    }

    sendHostStatus(clientSocket) {
        chatUtil.sendSysMsg(clientSocket, "本 host 連線數：" + this.wsServer.clients.size);
        let roomEntries = Object.entries(this.roomDB);
        chatUtil.sendSysMsg(clientSocket, "本 host room 數：" + roomEntries.length);
        roomEntries.forEach(d => {
            let roomId = d[0];
            let members = d[1];
            chatUtil.sendSysMsg(clientSocket, `---- roomId: ${roomId} ----`);
            for(let connId in members) {
                let socket = members[connId];
                chatUtil.sendSysMsg(clientSocket, `member: ${chatUtil.getClientNickname(socket)}(connId=${connId})`);
            }
            chatUtil.sendSysMsg(clientSocket, `---- roomId: ${roomId} ----`);
        });
        chatUtil.sendSysMsg(clientSocket, `本 host 訂閱 redis: [redis://${this.redisHost}:${this.redisPort}]`);
    }

    doJoinRoom = (clientSocket, roomId, nickname) => {
        chatUtil.assignClientSocketCustomInfo(clientSocket, roomId, nickname);
        if (!this.roomDB[roomId]) {
            this.roomDB[roomId] = {};
        }
        let roomMembers = this.roomDB[roomId];
        const connId = chatUtil.getClientConnId(clientSocket);
        if (!roomMembers[connId]) {
            roomMembers[connId] = clientSocket;
        }

        chatUtil.sendSysMsg(clientSocket, `Welcome ${nickname}, you joined room [${roomId}]`);
    }

    removeConn = (clientSocket) => {
        const connId = chatUtil.getClientConnId(clientSocket);
        const roomId = chatUtil.getClientRoomId(clientSocket);
        if (this.roomDB[roomId]) {
            delete this.roomDB[roomId][connId];
        }
    }

    handleAction = (clientSocket, clientMsg) => {
        const action = clientMsg.action;
        switch (action) {
            case "joinRoom":
                this.doJoinRoom(clientSocket, clientMsg.data.roomId, clientMsg.data.nickname);
                break;
            case "askHostStatus":
                this.sendHostStatus(clientSocket);
                break;
            case "sendMessage":
                let roomId = chatUtil.getClientRoomId(clientSocket);
                let senderNickname = chatUtil.getClientNickname(clientSocket);

                if (this.isPubSubMode) {
                    // via pub/sub (support multiple nodes)
                    clientMsg.data.roomId = roomId;
                    clientMsg.data.senderNickname = senderNickname;
                    this.publishRelay(clientMsg);
                } else {
                    // via in-memory (when single node)
                    this.sendMsgToRoom(roomId, senderNickname, clientMsg.data.msg);
                }
                break;
            case "clearRoomDB":
                this.roomDB = {};
                break;
            default:
                console.log("Unknown payload: ", clientMsg);
                break;
        }
    }
}
