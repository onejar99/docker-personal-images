FROM python:3.12-rc-alpine3.18

RUN apk update
RUN apk add vim

COPY app_start.sh /root/
RUN chmod +x /root/app_start.sh

COPY app /root/app
COPY requirements.txt /root/app/
RUN cd /root/app && pip install -r requirements.txt

RUN echo "alias ll='ls -al'" > /root/.bash_profile

WORKDIR /root/app
EXPOSE 5000

ENTRYPOINT ["sh", "/root/app_start.sh"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
