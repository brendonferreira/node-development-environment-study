FROM node:10

COPY [".", "/usr/src/service"]

WORKDIR /usr/src/service

RUN npm install
RUN npm i -g nodemon

EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && nodemon www/boot.js