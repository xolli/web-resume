FROM docker.io/caddy:2
LABEL authors="xolli"

RUN pwd

WORKDIR /src
RUN pwd

COPY . .
RUN apk add --update nodejs npm
RUN npm ci
RUN npm run astro telemetry disable
RUN npm run build
RUN pwd

RUN ls
RUN pwd

COPY ./dist /srv
COPY ./container/Caddyfile /etc/caddy/Caddyfile

WORKDIR /srv
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
