FROM node

WORKDIR /app

COPY . .

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

EXPOSE 3000

CMD [ "node", "./app.js" ]

