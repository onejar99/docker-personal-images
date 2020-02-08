# phpmyadmin

## Introduction

- Base on image: [phpmyadmin/phpmyadmin](https://hub.docker.com/r/phpmyadmin/phpmyadmin/)

## Quick Start

Preset: run a MySQL container named `myMysql`.

```
$ docker pull onejar99/phpmyadmin
$ docker run --name myPma -d --link myMysql -e PMA_HOST=myMysql -p 40002:80 onejar99/phpmyadmin
```

And then visit http://127.0.0.1:40002.



## Build & Release

```
$ docker build -t onejar99/phpmyadmin .
$ docker push onejar99/phpmyadmin
```


## References

- Docker Repository: https://hub.docker.com/r/onejar99/phpmyadmin/tags
- GitHub: https://github.com/onejar99/docker-personal-images/tree/master/phpmyadmin
