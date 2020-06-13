FROM node:14-alpine

RUN \
apk update && \
apk upgrade && \
apk add --no-cache git ca-certificates wget openssh git && \
update-ca-certificates && \
wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 && \
echo "37f2c1f0372a45554f1b89924fbb134fc24c3756efaedf11e07f599494e0eff9  /usr/local/bin/dumb-init" | sha256sum -c - && \
chmod 755 /usr/local/bin/dumb-init;

WORKDIR /usr/app

RUN chown -R node /usr/app

USER node

COPY --chown=node:node ["package.json", "package-lock.json", "./"]

RUN npm ci --production

COPY --chown=node:node ["rds-combined-ca-bundle.pem", "./dist", "./"]

CMD ["dumb-init", "node", "main.js"]
