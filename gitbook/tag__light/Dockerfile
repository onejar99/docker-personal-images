FROM node:18.16.0-alpine3.16

RUN apk update
RUN apk add vim unzip

# basic gitbook commands
RUN npm install gitbook-cli -g
# for fixing issue of cannot install gitbook in node 18.16.0
RUN cd /usr/local/lib/node_modules/gitbook-cli/node_modules/npm/node_modules \
    && npm install graceful-fs@latest --save
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
