FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i -g @nestjs/cli && npm ci

COPY . .

CMD ["nest", "start", "--watch"]