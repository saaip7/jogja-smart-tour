# Use Node.js version that's compatible with the project dependencies
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies using legacy-peer-deps flag
RUN npm ci --legacy-peer-deps

# Copy application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["npm", "start"]