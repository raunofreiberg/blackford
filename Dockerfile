FROM node:8.6.0

WORKDIR /usr/app

COPY package.json package.json

RUN npm install
RUN npm rebuild node-sass

EXPOSE 3001

CMD npm run prod