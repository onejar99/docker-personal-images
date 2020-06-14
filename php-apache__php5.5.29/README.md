# php-apache:php5.5.29

## Introduction

A customized php-apache image for compatible with php 5.x for purposes of development and test. Not recommended to use in production environment.

Customized:
- Change timezone to Asia/Taipei.
- install php package mysql
- install php package mysqli
- install php package mbstring
- customize php.ini
- customize apache config with access/error logs rotation (keep 1 year)


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
$ docker run --name myPhpApache -d -p 40001:80 -v /tmp/testWWW:/var/www/html onejar99/php-apache:php5.5.29
```
And then visit http://127.0.0.1:40001/test.php.

You also can persist error logs by volumes:

```
$ docker run --name myPhpApache -d -p 40001:80  -v /tmp/testWWW:/var/www/html  -v $(PWD)/log:/var/log/custom  onejar99/php-apache:php5.5.29
```


## Configuration

* php.ini path in container: `/usr/local/etc/php/php.ini`
* apache configuration file in container: `/etc/apache2/sites-available/custom-default.conf`
* access log path in container: `/var/log/custom/access.log.*` (rotated by day)
* php error log path in container: `/var/log/custom/php_errors.log.*` (rotated by day)


## Build & Release

```
$ majorTag=php5.5.29 && buildTag=${majorTag}_$(date +"%Y%m%d") && echo $buildTag \
&& docker build -t onejar99/php-apache:${buildTag} . \
&& docker push onejar99/php-apache:${buildTag} \
&& docker image tag onejar99/php-apache:${buildTag} onejar99/php-apache:${majorTag} \
&& docker push onejar99/php-apache:${majorTag}
```


## References

- Docker Repository: https://hub.docker.com/r/onejar99/php-apache/tags
- GitHub: https://github.com/onejar99/docker-personal-images/tree/master/php-apache__php5.5.29
