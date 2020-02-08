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

Or test your code by volumes:

```
$ mkdir /tmp/testWWW
$ echo '<?php echo "hi php"; ?>' > /tmp/testWWW/test.php
$ docker run --name myPhpApache -d -p 40002:80 -v /tmp/testWWW:/var/www/html onejar99/php-apache:php5.5.29
```
visit http://127.0.0.1:40002/test.php.


## Build & Release

```
$ docker build -t onejar99/php-apache:php5.5.29 .
$ docker push onejar99/php-apache:php5.5.29
```


## References

- Docker Repository: https://hub.docker.com/r/onejar99/php-apache/tags
- GitHub: https://github.com/onejar99/docker-personal-images/tree/master/php-apache__php5.5.29
