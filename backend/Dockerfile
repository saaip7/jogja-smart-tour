# Use Node.js version that's compatible with the project dependencies
FROM node:20-alpine AS base

WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package.json package-lock.json* yarn.lock* ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build TypeScript files
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]