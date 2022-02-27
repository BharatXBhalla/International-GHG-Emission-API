FROM node:12.18.1-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 5000

RUN apk --update add redis 

CMD [ "node", "index.js" ]