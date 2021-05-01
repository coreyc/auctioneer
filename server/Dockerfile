FROM node:16.0.0
EXPOSE 3001

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "sleep", "infinity" ]