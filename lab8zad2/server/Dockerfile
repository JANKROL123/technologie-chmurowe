FROM node:alpine
WORKDIR /app
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]