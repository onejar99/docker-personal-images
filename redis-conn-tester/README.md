
# redis-conn-tester

## Introduction

A simple web application to test connection with specified redis server.

## Quick Start

### 1. Start service

```bash
$ cd redis-conn-tester
$ docker build -t oj99test/redis-conn-tester .
$ docker run -d --rm --name testRedisWeb -p 45001:80 oj99test/redis-conn-tester:latest
```

### 2. (Optional) Start a Redis Server by Docker

> Skip this setp if you have an existing redis server.

```bash
### start a redis server by docker
$ docker run -d --rm --name redisServer -p 16379:6379 redis

### get the container ip of redisServer
$ docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' redisServer
172.17.0.3

### redis endpoint for other containers:
# `redis://172.17.0.3:6379`
```


### API 1: health check

`GET http://localhost:45001/healthCheck`

response:
```
Hello, I am good!
```

### API 2: Set redis

`POST http://localhost:45001/testRedis`

payload:
```json
{
    "url":"redis://172.17.0.3:6379",
    "action": "set",
    "key": "k111",
    "value": "v11111"
}
```

response:
```
OK to set: key=k111, value = v11111
```


### API 3: Get redis

`POST http://localhost:45001/testRedis`

payload:
```json
{
    "url":"redis://172.17.0.3:6379",
    "action": "get",
    "key": "k111"
}
```

response:
```
OK to get: key=k111, value=v11111
```


## Build & Release

```bash
$ majorTag=latest && buildTag=${majorTag}_$(date +"%Y%m%d") && echo $buildTag \
&& docker build -t onejar99/redis-conn-tester:${buildTag} . \
&& docker image tag onejar99/redis-conn-tester:${buildTag} onejar99/redis-conn-tester:${majorTag} \
&& docker push onejar99/redis-conn-tester:${buildTag} \
&& docker push onejar99/redis-conn-tester:${majorTag}
```


## References

- GitHub: https://github.com/onejar99/docker-personal-images
- Docker Repository: https://hub.docker.com/r/onejar99

