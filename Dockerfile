FROM node:lts as base

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000 35729

ENTRYPOINT npm start -- --host 0.0.0.0
