FROM node:20 AS build

WORKDIR /architecton

COPY package*.json .

RUN npm install -g pnpm

RUN pnpm i

COPY . .

CMD ["pnpm run build"]
