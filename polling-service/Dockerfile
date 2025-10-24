FROM node:22-slim

WORKDIR /src

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 8000

CMD ["npm", "start"]