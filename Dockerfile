FROM node:12-alpine

WORKDIR /var/bin/www

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]