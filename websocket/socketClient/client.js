let socket;

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(match) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[match];
    });
  }

function log(msg) {
    $("#log").prepend(`<li>${escapeHTML(msg)}</li>`);
}

function connect(serverAddr) {
    console.log("[connect] server=", serverAddr);
    log("Connecting...");
    socket = new WebSocket(serverAddr);

    socket.onopen = () => {
        console.log('[onopen] open connection');
        log("Connected!");
    }
    socket.onclose = (event) => {
        if (event.wasClean) {
            alert(`[onclose] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
          } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            alert('[onclose] Connection died');
          }
    }
    socket.onmessage = event => {
        console.log(`[onmessage] event data =`, event.data);
        log(event.data);
    }
    socket.onerror = function(error) {
        alert(`[onerror] error = `, error);
    };
}

const sendMsg = (msg) => {
    console.log("[client send] msg = ", msg);
    msg = JSON.stringify(msg);
    log("[Send] " + msg);
    socket.send(msg);
}

function joinRoom(nickname, roomId) {
    console.log("[joinRoom] nickname=", nickname, "roomId", roomId);
    let msg = {action: "joinRoom", data: {roomId: roomId, nickname: nickname} };
    sendMsg(msg);
}

function askServerStatus() {
    console.log("[askServerStatus]");
    let msg = {action: "askHostStatus"};
    sendMsg(msg);
}

function clearRoomDB() {
    console.log("[clearRoomDB]");
    let msg = {action: "clearRoomDB"};
    sendMsg(msg);
}

function sendMessage(text) {
    console.log("[clearRoomDB]");
    let msg = {action: "sendMessage", data: {msg: text}};
    sendMsg(msg);
}
