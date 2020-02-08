# php-apache:php5.5.29

## Introduction

A customized php-apache image for compatible with php 5.x for purposes of development and test. Not recommended to use in production environment.

Customized:
- install php package mysql
- install php package mysqli


## Quick Start

```
$ docker pull onejar99/php-apache:php5.5.29
$ docker run --name myPhpApache -d -p 40001:80 onejar99/php-apache:php5.5.29
```

And then visit http://127.0.0.1:40001.



## Build & Release

```
$ docker build -t onejar99/php-apache:php5.5.29 .
$ docker push onejar99/php-apache:php5.5.29
```


## References

- Docker Repository: https://hub.docker.com/r/onejar99/php-apache/tags
- GitHub: https://github.com/onejar99/docker-personal-images/tree/master/php-apache__php5.5.29
