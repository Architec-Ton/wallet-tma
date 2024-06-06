FROM node:20 as build

WORKDIR /architecton

COPY package*.json .

RUN npm i

COPY . .

CMD ["npm run build"]