FROM mhart/alpine-node:5.9
ENV PM2_VERSION 1.1.1
RUN apk --update add git
RUN npm install -g pm2@${PM2_VERSION}
RUN rm -rf /var/cache/apk/* && rm -rf /tmp/npm*


#OPEN PORTS
EXPOSE 8028 8029 8030 8031 8032 8033 8034 80 3000 443 3001
EXPOSE 4200
EXPOSE 49153

ENV appname app
RUN mkdir /coinfolio && mkdir /coinfolio/${appname}

COPY server /coinfolio/${appname}/server
RUN cd /coinfolio/${appname}/server && npm install
COPY dist /coinfolio/${appname}/dist

#NO CACHE AFTER THIS STEP
ARG DEVBUILDNB
RUN echo "Build #        :${DEVBUILDNB}"
ENV DEVBUILDNB ${DEVBUILDNB}

#START
CMD pm2 start /coinfolio/app/server/server.js --no-daemon --name "app-${DEVBUILDNB}"

























