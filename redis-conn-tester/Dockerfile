FROM node:18.16.0-alpine3.16

RUN apk update
RUN apk add vim

COPY docker_start.sh /root/
RUN chmod +x /root/docker_start.sh

RUN mkdir -p /root/app
COPY src /root/app/src
COPY package.json /root/app/
COPY package-lock.json /root/app/

WORKDIR /root/app
EXPOSE 3000
EXPOSE 80

ENTRYPOINT ["sh", "/root/docker_start.sh"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
