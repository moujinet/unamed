FROM docker.io/library/node:lts-alpine AS base

WORKDIR /unamed

FROM base as builder

RUN corepack enable

RUN apk update
RUN apk add git --no-cache

RUN echo "DATABASE_URL=file:/unamed/data/unamed.sqlite" > .env
RUN mkdir /unamed/data

COPY . ./
RUN pnpm i --frozen-lockfile

RUN pnpm prepare
RUN pnpm build

FROM base as runner

COPY --from=builder /unamed/.output ./.output
COPY --from=builder /unamed/data /unamed/data

ARG UID=99
ARG GID=99

RUN set -eux; \
  addgroup -g $GID -S unamed; \
  adduser -u $UID -S unamed -G unamed; \
  chown -R unamed:unamed /unamed

USER unamed

ENV NODE_ENV=production

ENV DATABASE_URL='file:/unamed/data/unamed.sqlite'

EXPOSE 8553/tcp

ENV PORT=8553

VOLUME ["/unamed/data"]

CMD ["node", ".output/server/index.mjs"]
