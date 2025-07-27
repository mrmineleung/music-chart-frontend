FROM node:22.17.1-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN npm run build

FROM nginx:1.29.0-alpine-slim


COPY ./nginx/mime.types /etc/nginx/mime.types
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000

ENTRYPOINT ["nginx","-g","daemon off;"]