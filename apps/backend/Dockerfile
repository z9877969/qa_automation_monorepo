FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir -p public/avatars public/recipes public/ingredients src/temp

EXPOSE 5000
CMD ["node", "src/index.js"]
