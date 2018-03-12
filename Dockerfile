FROM suancloud/nginx4angular
LABEL maintainer="chad@suancloud.cn"

RUN rm -rf /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html
