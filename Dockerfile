# Multi-stage build
# Build stage
FROM node:16-alpine as build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Production stage
FROM node:16-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ .
COPY --from=build /app/dist ./public

EXPOSE 3000
CMD ["node", "server.js"]