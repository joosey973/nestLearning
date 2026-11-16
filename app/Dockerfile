FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src ./src
COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY .env ./.env

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
