FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

RUN npm install -g @angular/cli@latest

COPY . /app 

EXPOSE 4200

CMD [ "ng", "serve", "--host", "0.0.0.0", "--poll", "2000" ]