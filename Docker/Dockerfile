FROM docker.sieve.com.br/alpine/py27/uwsgi20:0.0.11

#Version: 0.0.1
#Tag: docker.sieve.com.br/infra/marathon-ui

ARG NODE_VERSION="5.4.1"

ENV NODE_URL="https://nodejs.org/download/release/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz"

WORKDIR /opt/app

RUN apk -U --no-cache add git tar xz curl python \
&& apk -U --no-cache add make gcc g++ linux-headers libgcc libstdc++ binutils-gold \
&& curl -sL "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION.tar.xz" | tar Jxvf - \
&& cd "node-v$NODE_VERSION" \
&& ./configure --prefix=/usr --without-snapshot --fully-static \
&& make -j2 \
&& make install \
&& apk --purge del make gcc g++ linux-headers libgcc libstdc++ binutils-gold \
&& cd .. \
&& rm -Rf "node-v$NODE_VERSION"

WORKDIR /opt/app
COPY package.json /opt/app
COPY . /opt/app
COPY Docker/files/config.js /opt/app/src/js/config/

RUN npm install \
&& npm install -g gulp \
&& gulp \
&& rm -rf node_modules /tmp/npm* /root/.npm

CMD ["uwsgi", "--buffer-size", "32768",\
"--static-map", "/=/opt/app/dist" ,\
"--http", "0.0.0.0:80",\
"--processes", "1",\
"--offload-threads", "8",\
"--http-timeout", "120",\
"--http-keepalive",\
"--mime-file", "/etc/uwsgi.d/mime.types",\
"--static-index", "index.html"]
