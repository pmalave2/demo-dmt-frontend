FROM node:18 as build-step

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build --prod


FROM nginx:1.23.3

COPY --from=build-step /app/dist/dmt-frontend /usr/share/nginx/html