FROM node:alpine
RUN apk add curl
WORKDIR /app
COPY ./package.json .
COPY ./package.json .
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]