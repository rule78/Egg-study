FROM registry.jianke.com/library/alinode:4.7.2


COPY app/ /var/www/app/
COPY config/ /var/www/config/
COPY package.json /var/www/package.json
COPY yarn.lock /var/www/yarn.lock


ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN yarn config set registry http://registry.npm.jianke.com
WORKDIR /var/www
RUN rm -rf app/model/boardarticle.js
RUN rm -rf app/model/board1Article.js

RUN yarn

ENV NODE_ENV production
ENV CLOUD_CONFIG_PROFILE default
ENV CLOUD_CONFIG_SERVER http://config-server.dev.jianke.com
ENV CLOUD_CONFIG_USER root
ENV CLOUD_CONFIG_PASSWORD password

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
