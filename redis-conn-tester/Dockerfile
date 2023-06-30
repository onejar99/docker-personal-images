FROM node:18.16.0-alpine3.16

RUN apk update
RUN apk add vim

COPY docker_start.sh /root/
RUN chmod +x /root/docker_start.sh

COPY app /root/app

WORKDIR /root/app
EXPOSE 80

ENTRYPOINT ["sh", "/root/docker_start.sh"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
