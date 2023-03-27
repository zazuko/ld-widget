# Stage 1: generate static files
FROM docker.io/library/node:18-alpine AS builder

WORKDIR /app

# install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# get other files, and build static app
COPY . .
RUN npm run build


# Stage 2: serve them using nginx
FROM docker.io/library/nginx:1.23-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ld-widget /usr/share/nginx/html

EXPOSE 8080
