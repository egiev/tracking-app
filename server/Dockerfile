FROM node:18

WORKDIR /app

COPY ./package* ./

RUN npm config set unsafe-perm true

RUN npm install

COPY . .

RUN chown -R node /app/node_modules

USER node

EXPOSE 5000

CMD ["npm", "run", "start"]