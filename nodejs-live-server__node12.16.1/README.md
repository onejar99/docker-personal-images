# nodejs-live-server:node12.16.1

## Introduction

A customized image for a quick web server environment using live-server in Node.js.

Packages:
* Node 12.16.1
* live-server@1.2.1
* opn@5.3.0

Customized:
- fixed issue of dependency about `opn`

```
.../node_modules/live-server/node_modules/opn/index.js:23
                ...options
                ^^^

SyntaxError: Unexpected token ...
    at createScript (vm.js:74:10)
    at Object.runInThisContext (vm.js:116:10)
    at Module._compile (module.js:533:28)
    at Object.Module._extensions..js (module.js:580:10)
    at Module.load (module.js:503:32)
    at tryModuleLoad (module.js:466:12)
    at Function.Module._load (module.js:458:3)
    at Module.require (module.js:513:17)
    at require (internal/module.js:11:18)
```


## Quick Start

```
$ docker pull onejar99/nodejs-live-server:node12.16.1
$ docker run -d --rm --name myNodeLiveServer -p 41001:8080 onejar99/nodejs-live-server:node12.16.1
```

And then visit http://127.0.0.1:41001.

Or test your code by volumes:

```
$ mkdir /tmp/testWWW
$ echo '<h1>Hi Live Server</h1>' > /tmp/testWWW/index.html
$ docker run -d --rm --name myNodeLiveServer -p 41001:8080 -v /tmp/testWWW:/home/app/public onejar99/nodejs-live-server:node12.16.1
```
and then visit http://127.0.0.1:41001.

## Build & Release

```
$ docker build -t onejar99/nodejs-live-server:node12.16.1 .
$ docker push onejar99/nodejs-live-server:node12.16.1
```


## References

- Docker Repository: https://hub.docker.com/r/onejar99/nodejs-live-server/tags
- GitHub: https://github.com/onejar99/docker-personal-images/tree/master/nodejs-live-server__node12.16.1
