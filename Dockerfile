FROM node:11-alpine

COPY package.json ./
RUN yarn install

COPY . .
