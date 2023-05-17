FROM node:alpine
WORKDIR /app
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --fronzen-lockfile
COPY . .
EXPOSE 3003
CMD ["node", "index.js"]