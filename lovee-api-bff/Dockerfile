FROM node:18-alpine AS builder

WORKDIR /home/lovee-api-bff

COPY src/ src/
COPY package-lock.json .
COPY package.json .
COPY tsconfig.json .

RUN npm ci
RUN npm run build

FROM node:18-alpine

WORKDIR /home/lovee-api-bff

# Update the package index and install curl
RUN apk update && \
    apk add --no-cache curl

COPY --from=builder /home/lovee-api-bff/dist/index.js .

HEALTHCHECK --interval=5s --timeout=2s --start-period=5s --retries=3 CMD \
    curl --silent --fail http://localhost:3000/ping | grep -q "pong" || exit 1

ENTRYPOINT [ "node", "./index.js" ]