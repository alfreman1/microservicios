FROM node:18-alpine

WORKDIR /app

# Instalar Prisma CLI
RUN npm install -g prisma

COPY package*.json ./
RUN npm install

COPY . .

# Generar cliente Prisma
RUN npx prisma generate

RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "start:prod"]




