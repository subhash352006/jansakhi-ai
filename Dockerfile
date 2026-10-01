# -------------------------------------------------------------
# Stage 1: Build Frontend Assets
# -------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy project source
COPY . .

# Build client production bundle
RUN npm run build:client

# -------------------------------------------------------------
# Stage 2: Production Runner
# -------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy dependency manifests and install production-only dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm install -g tsx

# Copy built frontend assets and server source code
COPY --from=builder /app/dist/client ./dist/client
COPY server ./server
COPY shared ./shared

# Expose standard Cloud Run port
EXPOSE 8080

# Run Express server using lightweight tsx
CMD ["tsx", "server/index.ts"]
