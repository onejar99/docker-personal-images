# javajdk

## Introduction

Customized javasdk images.

## Quick Start

```bash
$ cd ${your_java_code_folder}
$ docker run -ti --rm --name javasdk8 -v $(pwd):/myworkspace -v $(pwd)/.m2_cache:/root/.m2 onejar99/javasdk:openjdk8 bash
```

## Build & Release

### openjdk8

```
## dev build
$ docker build -t onejar99/javasdk:openjdk8 -f $(pwd)/Dockerfile_openjdk8 .

## release
$ majorTag=openjdk8 && buildTag=${majorTag}_$(date +"%Y%m%d") && echo $buildTag \
&& docker build -t onejar99/javasdk:${buildTag} -f $(pwd)/Dockerfile_openjdk8 . \
&& docker image tag onejar99/javasdk:${buildTag} onejar99/javasdk:${majorTag} \
&& docker push onejar99/javasdk:${buildTag} \
&& docker push onejar99/javasdk:${majorTag}
```


## References

- Docker Repository: https://hub.docker.com/r/onejar99/javajdk/tags
- GitHub: https://github.com/onejar99/docker-personal-images/tree/master/javajdk
