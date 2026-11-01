FROM node:22-alpine

WORKDIR /app

COPY content-service/ /app/

ENV NODE_ENV=production
ENV PORT=3000
ENV DATA_DIR=/data

EXPOSE 3000

CMD ["node", "src/index.mjs"]
