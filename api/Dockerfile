FROM node:12

WORKDIR /app

ARG BUILD_VERSION=1.1.0

RUN npm install -g nodemon
RUN npm install -g ts-node

COPY package*.json ./

RUN npm ci \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules

COPY . .

ENV PORT 8123

EXPOSE 8123

CMD ["node", "app.ts"]