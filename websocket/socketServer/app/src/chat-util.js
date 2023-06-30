const uuid = require('uuid');
const os = require('os');

const getHostname = () => {
    return os.hostname();
}

const getIpAddress = () => {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const addresses = interfaces[interfaceName];
        for (const address of addresses) {
        if (address.family === 'IPv4' && !address.internal) {
            return address.address;
        }
        }
    }
    return '<IP address not found>';
}

const sendNormalMsg = (clientSocket, msg, sender) => {
    clientSocket.send(`[Server<${getHostname()}>] ${sender}: ${msg}`);
}

const sendSysMsg = (clientSocket, msg) => {
    clientSocket.send(`[Server<${getHostname()}>][系統訊息] ${msg}`);
}

const assignClientSocketCustomInfo = (clientSocket, roomId, nickname) => {
    clientSocket.xNickname = nickname;
    clientSocket.xRoomId = roomId;
}

const assignConnectionId = (clientSocket) => {
    const connId = uuid.v4();
    clientSocket.xConnectionId = connId;
    return connId;
}

const getClientConnId = (clientSocket) => {
    return clientSocket.xConnectionId;
}

const getClientRoomId = (clientSocket) => {
    return clientSocket.xRoomId;
}

const getClientNickname = (clientSocket) => {
    return clientSocket.xNickname;
}

module.exports = {  sendNormalMsg,
                    sendSysMsg,
                    assignClientSocketCustomInfo,
                    assignConnectionId,
                    getClientConnId,
                    getClientRoomId,
                    getClientNickname
                }
