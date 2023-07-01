# websocket (Server & Client)

## Introduction

### Server

* Implemented by NodeJs.
* Use `express` + `ws` packages.
* Support 2 relay modes:
    1. In-memory: only support single server node.
    2. Pub/Sub(by Redis): support multiple server nodes.

### Client

* A simple client, using `WebSocket` API supported by native JavaScript.
* No 3rd party lib used.


## Quick Start: Start Server

### Method 1: Run at localhost Node.js

```bash
$ cd socketServer/app
$ npm i

## (A) In-memory relay mode
$ node src/server.js

## or (B) Pub/Sub relay mode
$ docker run -d --rm --name redisServer -p 16379:6379 redis  # (Skip if you have an existing redis server)
$ export REDIS_HOST=localhost && export REDIS_PORT=16379 && node src/server.js
```

* WebSocket Server endpoint: `ws://localhost:80`
* Server health check: `http://localhost:80/healthCheck`


### Method 2: Run by Docker

(A) In-memory relay mode:
```bash
$ docker run -ti --rm --name wsServer -p 43001:80 onejar99/websocket-server:latest
```

or (B) Pub/Sub relay mode:
```bash
### start a redis server by docker
$ docker run -d --rm --name redisServer -p 16379:6379 redis

### get the container ip of redisServer
$ docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' redisServer
172.17.0.3

### start websocket server
$ docker run -ti --rm -e REDIS_HOST=172.17.0.3 -e REDIS_PORT=6379 --name wsServer -p 43001:80 onejar99/websocket-server:latest
```

* WebSocket Server endpoint: `ws://localhost:43001`
* Server health check: `http://localhost:43001/healthCheck`


## Quick Start: Test by Client

1. Open `client.html` by browser:
    - Enter the WebSocket Server endpoint into `Server` field and click `Connect`.
    - Enter `Nickname` as AAA, choose Room1, and click `Join`.
2. Open another browser tab with:
    - Enter the WebSocket Server endpoint into `Server` field and click `Connect`.
    - Enter `Nickname` as BBB, choose Room1, and click `Join`.
3. Send message by AAA page, and observe the logs.


## Change WebSocket Port

* 80(default), You can use environment variable `WS_PORT` to change.
* Docker image support ports: 80 / 3000

```bash
# run by Node.js
$ export WS_PORT=35000 && REDIS_HOST=localhost && export REDIS_PORT=16379 && node src/server.js

# run by Docker
$ docker run -ti --rm -e WS_PORT=3000 -e REDIS_HOST=172.17.0.3 -e REDIS_PORT=6379 --name wsServer -p 43001:3000 onejar99/websocket-server:latest
```

## Build & Release

```bash
$ cd socketServer
$ majorTag=latest && buildTag=${majorTag}_$(date +"%Y%m%d") && echo $buildTag \
&& docker build -t onejar99/websocket-server:${buildTag} . \
&& docker image tag onejar99/websocket-server:${buildTag} onejar99/websocket-server:${majorTag} \
&& docker push onejar99/websocket-server:${buildTag} \
&& docker push onejar99/websocket-server:${majorTag}
```

## Refs about WebSocket

* [JavaScript | WebSocket 讓前後端沒有距離| Medium](https://medium.com/enjoy-life-enjoy-coding/javascript-websocket-%E8%AE%93%E5%89%8D%E5%BE%8C%E7%AB%AF%E6%B2%92%E6%9C%89%E8%B7%9D%E9%9B%A2-34536c333e1b)


## References

- GitHub: https://github.com/onejar99/docker-personal-images
- Docker Repository: https://hub.docker.com/r/onejar99
