#build
FROM node:lts-alpine as builder

LABEL stage=builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#mount
FROM node:lts-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /usr/app/dist ./dist

ARG RABBITMQ_HOST
ARG RABBITMQ_PORT
ARG RABBITMQ_USER
ARG RABBITMQ_PASSWORD
ARG RABBITMQ_SEND_EMAIL_QUEUE

ENV RABBITMQ_HOST ${RABBITMQ_HOST}
ENV RABBITMQ_PORT ${RABBITMQ_PORT}
ENV RABBITMQ_USER ${RABBITMQ_USER}
ENV RABBITMQ_PASSWORD ${RABBITMQ_PASSWORD}
ENV RABBITMQ_SEND_EMAIL_QUEUE ${RABBITMQ_SEND_EMAIL_QUEUE}

EXPOSE 8000
CMD node dist/App.js