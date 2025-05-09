# Use Node.js version that's compatible with the project dependencies
FROM node:20-alpine AS base

WORKDIR /app

# Install required system dependencies
RUN apk add --no-cache curl wget postgresql-client ca-certificates

# Install TypeScript globally to ensure it's available for compilation
RUN npm install -g typescript

# Copy package.json and package-lock.json/yarn.lock
COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies with --legacy-peer-deps to avoid issues
RUN npm ci --legacy-peer-deps

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the TypeScript configuration files
COPY tsconfig.json tsconfig.*json* ./

# Copy source files
COPY src ./src/

# Set environment variables
ENV PORT=5000
ENV NODE_ENV=production

EXPOSE 5000

# Start the server directly using node
CMD ["node", "src/server.js"]