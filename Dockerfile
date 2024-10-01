# react app build
FROM node:21.7.3-alpine AS build

# cd
WORKDIR /app

# packages
COPY client/package*.json ./client/

RUN cd client && npm install

COPY client ./client

RUN cd client && npm run build

FROM node:21.7.3-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY server ./server

COPY --from=build /app/client/dist ./client/dist

EXPOSE 3000

ENV PORT=3000
ENV MONGODB_URI=mongodb://mongo:27017/mydb

CMD ["node", "server/index.js"]