FROM node:12.18.4-alpine as builder
WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app
CMD ["npm","start"]