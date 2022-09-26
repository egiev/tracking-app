FROM node:16

WORKDIR /app

COPY ./package* ./

RUN npm config set unsafe-perm true

RUN npm install

COPY . .

RUN chown -R node /app/node_modules

USER node

EXPOSE 3000

CMD ["npm", "start"]
