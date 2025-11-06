FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci || true

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json ./ || true
COPY src ./src || true
RUN npm run build || true

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist || true
COPY --from=deps /app/node_modules ./node_modules || true
ENV PORT=3000
EXPOSE 3000
# Nota: ajusta el comando según tu bootstrap (Nest)
CMD ["node", "dist/main.js"]
