FROM node:12.16.1

RUN apt-get update
RUN apt-get install -y vim

# basic gitbook commands
RUN npm install gitbook-cli -g
# note: do not install `gitbook` package by npm, or it will install gitbook@2.6.9 and cannot work
RUN gitbook --version # Trigger installing gitbook
RUN npm install gitbook-plugin -g

# for fixing unstable issue
COPY copyPluginAssets.js /root/.gitbook/versions/3.2.3/lib/output/website/

COPY custom-entrypoint.sh /root/
RUN chmod +x /root/custom-entrypoint.sh

WORKDIR /gitbook
EXPOSE 4000

ENTRYPOINT ["sh", "/root/custom-entrypoint.sh"]
