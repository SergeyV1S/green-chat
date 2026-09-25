FROM node:22.23.3-alpine AS builder

WORKDIR /var/www

COPY package.json ./
RUN yarn install

COPY . .

RUN yarn build

FROM nginx:stable-alpine AS production

COPY --from=builder /var/www/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]