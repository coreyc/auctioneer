FROM node:16.0.0
EXPOSE 3000

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]