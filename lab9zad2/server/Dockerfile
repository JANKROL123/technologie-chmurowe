FROM --platform=linux/arm64/v8 node:alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]