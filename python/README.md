# python

## Introduction

Customized python images.

## Quick Start

```bash
$ cd ${your_code_folder}
$ docker run -ti --rm --name python3_8 -v $(pwd):/myworkspace -w /myworkspace onejar99/python:3.8 bash
```

## Build & Release

### python:3.8

```
## dev build
$ docker build -t onejar99/python:3.8 -f $(pwd)/Dockerfile__python3_8 .

## release
$ majorTag=3.8 && buildTag=${majorTag}_$(date +"%Y%m%d") && echo $buildTag \
&& docker build -t onejar99/python:${buildTag} -f $(pwd)/Dockerfile__python3_8 . \
&& docker image tag onejar99/python:${buildTag} onejar99/python:${majorTag} \
&& docker push onejar99/python:${buildTag} \
&& docker push onejar99/python:${majorTag}
```


## References

- Docker Repository: https://hub.docker.com/r/onejar99/python/tags
- GitHub: https://github.com/onejar99/docker-personal-images/tree/master/python
