FROM sraicronos/expo:3.21.5 as build-image
COPY . .
RUN npm install
RUN npm run predeploy

FROM nginx
COPY ./deploy_assets/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-image ./web-build /usr/share/nginx/html
