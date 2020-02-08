# mysql:5.6

## Introduction

A customized image for MySQL 5.6.

Customized:
- Change timezone to Asia/Taipei.


## Quick Start

```
$ docker pull onejar99/mysql:5.6
$ docker run -d --name myMysql -e MYSQL_ROOT_PASSWORD=<MYSQL_ROOT_PW> onejar99/mysql:5.6
```

Test by another container with mysql client:

```
# Get IP of mysql container
$ docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' myMysql
172.17.0.3

# Run another container which support mysql client
$ docker run -ti --name mysqlClient -e MYSQL_ROOT_PASSWORD=123 mysql:5.6 /bin/bash
root@fb30a83693c1:/# mysql -h 172.17.0.3 -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 1
Server version: 5.6.46 MySQL Community Server (GPL)

Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
3 rows in set (0.00 sec)

mysql>
```

## Build & Release

```
$ docker build -t onejar99/mysql:5.6 .
$ docker push onejar99/mysql:5.6
```


## References

- Docker Repository: https://hub.docker.com/r/onejar99/mysql/tags
- GitHub: https://github.com/onejar99/docker-personal-images/tree/master/mysql__5.6
