FROM node:24-alpine

WORKDIR /app

COPY content-service/ /app/

RUN mkdir -p /data && chown node:node /data

ENV NODE_ENV=production
ENV PORT=3000
ENV DATA_DIR=/data

USER node

EXPOSE 3000

CMD ["node", "src/index.mjs"]
