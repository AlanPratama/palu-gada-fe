FROM node:18-alpine

ENV VITE_API_BASE_URL="http://localhost:8080/"

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 80

CMD [ "serve", "-s", "dist" ]