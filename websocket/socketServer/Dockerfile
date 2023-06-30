FROM node:18.16.0-alpine3.16

RUN apk update
RUN apk add vim

COPY app_start.sh /root/
RUN chmod +x /root/app_start.sh

COPY app /root/app

WORKDIR /root/app
#EXPOSE 3000
EXPOSE 80

ENTRYPOINT ["sh", "/root/app_start.sh"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
