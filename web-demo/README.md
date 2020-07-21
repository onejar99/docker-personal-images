# web-demo

## Introduction

A very simple image which can launch a web page.
They can use to test deplying various veriosn services on k8s.

![](i_imgur_com_3RoT0yF.png)

## Quick Start

```bash
$ docker run -d --rm --name demoWebV1 -p 41001:80 onejar99/web-demo:v1   # visit http://127.0.0.1:41001
$ docker run -d --rm --name demoWebV2 -p 41002:80 onejar99/web-demo:v2   # visit http://127.0.0.1:41002
```

## Build & Release

```
$ docker build -t onejar99/web-demo:v1 -f $(pwd)/Dockerfile_v1 .
$ docker build -t onejar99/web-demo:v2 -f $(pwd)/Dockerfile_v2 .
$ docker push onejar99/web-demo:v1
$ docker push onejar99/web-demo:v2
```


## References

- Docker Repository: https://hub.docker.com/r/onejar99/web-demo/tags
- GitHub: https://github.com/onejar99/docker-personal-images/tree/master/web-demo
