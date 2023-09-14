FROM docker.io/library/node:lts-alpine AS base

WORKDIR /unamed

ENV DATABASE_URL='file:/unamed/data/unamed.sqlite'
ENV UPLOAD_PATH='/unamed/public/avatars'

FROM base as builder

RUN corepack enable

RUN apk update
RUN apk add git --no-cache
RUN mkdir /unamed/data

COPY . ./
RUN pnpm i --frozen-lockfile

RUN pnpm prepare
RUN pnpm build

FROM base as runner

COPY --from=builder /unamed/.output ./
COPY --from=builder /unamed/data /unamed/data

RUN mkdir /unamed/public/avatars

ARG UID=99
ARG GID=99

RUN set -eux; \
  addgroup -g $GID -S unamed; \
  adduser -u $UID -S unamed -G unamed; \
  chown -R unamed:unamed /unamed

USER unamed

ENV NODE_ENV=production
ENV PORT=8553

EXPOSE ${PORT}

VOLUME ["/unamed/data"]

CMD ["node", "server/index.mjs"]
