FROM docker.sieve.com.br/infra/nodejs541:0.0.1

#Version: 0.0.2
#Tag: infra/marathon-ui

WORKDIR /opt/app
COPY package.json /opt/app

COPY Docker/files/e /e
RUN chmod 755 /e

COPY . /opt/app
RUN npm install \
      && npm install -g gulp \
      && gulp \
      && rm -rf node_modules /tmp/npm* /root/.npm

COPY Docker/files/config.js /opt/app/src/js/config/

RUN mkdir -pv /opt/app/dist/login \
&& mkdir -pv /opt/app/dist/authenticated
COPY Docker/files/login.html.template /tmp
COPY Docker/files/authenticated.html /opt/app/dist/authenticated/index.html

#http://localhost:5000/login/google

ENTRYPOINT ["/e" \
  , "--render-template=/tmp/login.html.template:/opt/app/dist/login/index.html" \
  , "--" \
]

CMD ["/usr/bin/uwsgi", "--buffer-size", "32768",\
"--static-map", "/=/opt/app/dist" ,\
"--http", "0.0.0.0:80",\
"--processes", "1",\
"--offload-threads", "8",\
"--http-timeout", "120",\
"--http-keepalive",\
"--mime-file", "/etc/uwsgi.d/mime.types",\
"--static-index", "index.html"]
