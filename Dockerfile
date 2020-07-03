FROM node:12.16.1 as build-image
RUN npm install -g expo-cli
COPY . .
RUN npm install
RUN npm run predeploy

FROM nginx
COPY ./deploy_assets/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-image ./web-build /usr/share/nginx/html
