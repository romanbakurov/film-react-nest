FROM nginx:stable-alpine

COPY default.conf /etc/nginx/conf.d/default.conf

# Копируем фронтенд статику из volume (монтируется docker-compose)
VOLUME ["/usr/share/nginx/html"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]