# Bell Client
FROM node:22-alpine AS bell-client

COPY bell-client/package*.json .

RUN npm ci

COPY bell-client .

RUN npm run build

# Bell Status Client
FROM node:22-alpine AS bell-status-client

COPY bell-status-client/package*.json .

RUN npm ci

COPY bell-status-client .

RUN npm run build

# Server
FROM node:22-alpine 

WORKDIR /server

COPY server/package*.json .

RUN npm ci

COPY server index.js

COPY --from=bell-client dist bell-client
COPY --from=bell-status-client dist bell-status-client

EXPOSE 8080

CMD [ "node", "index.js" ]