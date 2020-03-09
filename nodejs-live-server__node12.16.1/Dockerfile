FROM node:12.16.1

COPY nodejs-live-server /home/app

WORKDIR /home/app
RUN npm install
RUN rm -rf node_modules/live-server/node_modules/opn

EXPOSE 8080
CMD ["npm", "run", "serve"]
