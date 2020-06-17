FROM nginx
COPY ./deploy_assets/default.conf /etc/nginx/conf.d/default.conf
COPY ./web-build /usr/share/nginx/html


