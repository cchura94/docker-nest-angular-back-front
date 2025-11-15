FROM node:22-alpine3.22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/src/main.js" ]
