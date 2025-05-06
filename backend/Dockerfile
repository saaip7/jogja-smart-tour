# Use Node.js version that's compatible with the project dependencies
FROM node:20-alpine AS base

WORKDIR /app

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

# Explicit TypeScript build 
RUN echo "Building TypeScript files..."
RUN npx tsc --build || echo "TypeScript build failed. Will use alternative approach."

# Debug: list files to see what was produced
RUN echo "Listing contents of /app directory:"
RUN ls -la
RUN echo "Listing contents of /app/src directory:"
RUN ls -la src/
RUN echo "Listing contents of /app/dist directory (if it exists):"
RUN ls -la dist/ 2>/dev/null || echo "No dist directory was created"

# Create a custom server script that can handle both TS and JS environments
RUN echo "console.log('Starting Jogja Smart Tour API server...');" > start-server.js
RUN echo "try {" >> start-server.js
RUN echo "  console.log('Attempting to load from dist/server.js...');" >> start-server.js
RUN echo "  require('./dist/server.js');" >> start-server.js
RUN echo "} catch (e) {" >> start-server.js
RUN echo "  console.log('Failed to load from dist/server.js:', e.message);" >> start-server.js
RUN echo "  console.log('Attempting to load from src/server.js...');" >> start-server.js
RUN echo "  require('./src/server.js');" >> start-server.js
RUN echo "}" >> start-server.js

# Set environment variables
ENV PORT=5000
ENV NODE_ENV=production

EXPOSE 5000

# Start the server using our custom script
CMD ["node", "start-server.js"]