# Этап сборки
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Финальный минимальный образ
FROM nginx:1.25-alpine

# Копируем собранный dist
COPY --from=builder /app/dist /usr/share/nginx/html

# Кастомный конфиг Nginx (если есть)
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
