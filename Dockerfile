FROM node:lts as base

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000 35729

ENTRYPOINT npm start -- --host 0.0.0.0
