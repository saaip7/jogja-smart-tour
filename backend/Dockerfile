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

# Explicit TypeScript build 
RUN echo "Building TypeScript files..."
RUN npx tsc --build || echo "TypeScript build failed. Will use alternative approach."

# Create port fix script
RUN echo '#!/bin/sh' > /app/fix-port.sh
RUN echo 'SERVER_FILE=$(find /app/src -name "server.js")' >> /app/fix-port.sh
RUN echo 'echo "Found server file at: $SERVER_FILE"' >> /app/fix-port.sh
RUN echo 'if grep -q "process.env.PORT || 5432" "$SERVER_FILE"; then' >> /app/fix-port.sh
RUN echo '  echo "Fixing incorrect port in $SERVER_FILE..."' >> /app/fix-port.sh
RUN echo '  sed -i "s/process.env.PORT || 5432/process.env.PORT || 5000/g" "$SERVER_FILE"' >> /app/fix-port.sh
RUN echo '  echo "Port fixed!"' >> /app/fix-port.sh
RUN echo 'elif grep -q "5432" "$SERVER_FILE"; then' >> /app/fix-port.sh
RUN echo '  echo "Found 5432 port in another form, attempting to fix..."' >> /app/fix-port.sh
RUN echo '  sed -i "s/5432/5000/g" "$SERVER_FILE"' >> /app/fix-port.sh
RUN echo '  echo "Port potentially fixed!"' >> /app/fix-port.sh
RUN echo 'else' >> /app/fix-port.sh
RUN echo '  echo "Port already set correctly or using a different format."' >> /app/fix-port.sh
RUN echo 'fi' >> /app/fix-port.sh
RUN echo 'if [ -f "/app/src/app.js" ]; then' >> /app/fix-port.sh
RUN echo '  if grep -q "5432" "/app/src/app.js"; then' >> /app/fix-port.sh
RUN echo '    echo "Fixing port in app.js..."' >> /app/fix-port.sh
RUN echo '    sed -i "s/5432/5000/g" "/app/src/app.js"' >> /app/fix-port.sh
RUN echo '    echo "app.js port fixed!"' >> /app/fix-port.sh
RUN echo '  fi' >> /app/fix-port.sh
RUN echo 'fi' >> /app/fix-port.sh
RUN echo 'echo "Port check completed."' >> /app/fix-port.sh
RUN chmod +x /app/fix-port.sh

# Create a startup script that handles DB connection
RUN echo '#!/bin/sh' > /app/start.sh
RUN echo 'echo "Starting Jogja Smart Tour API..."' >> /app/start.sh
RUN echo 'echo "Fixing port configuration issues..."' >> /app/start.sh
RUN echo '/app/fix-port.sh' >> /app/start.sh
RUN echo 'echo "Testing database connection..."' >> /app/start.sh
RUN echo 'PGPASSWORD=$(echo $DATABASE_URL | sed -n "s/^.*:\/\/[^:]*:\([^@]*\)@.*$/\1/p" | sed "s/%24/$/g")' >> /app/start.sh
RUN echo 'HOST=$(echo $DATABASE_URL | sed -n "s/^.*@\([^:]*\):[0-9]*\/.*$/\1/p")' >> /app/start.sh
RUN echo 'PORT=$(echo $DATABASE_URL | sed -n "s/^.*@[^:]*:\([0-9]*\)\/.*$/\1/p")' >> /app/start.sh
RUN echo 'USER=$(echo $DATABASE_URL | sed -n "s/^.*:\/\/\([^:]*\):.*$/\1/p")' >> /app/start.sh
RUN echo 'DB=$(echo $DATABASE_URL | sed -n "s/^.*\/\([^?]*\).*$/\1/p")' >> /app/start.sh
RUN echo 'echo "Attempting telnet to test connectivity..."' >> /app/start.sh
RUN echo 'timeout 5 sh -c "</dev/tcp/$HOST/$PORT" >/dev/null 2>&1' >> /app/start.sh
RUN echo 'if [ $? -eq 0 ]; then' >> /app/start.sh
RUN echo '  echo "✅ TCP connection to $HOST:$PORT successful"' >> /app/start.sh
RUN echo 'else' >> /app/start.sh
RUN echo '  echo "⚠️ TCP connection to $HOST:$PORT failed"' >> /app/start.sh
RUN echo 'fi' >> /app/start.sh
RUN echo 'echo "Testing DNS resolution..."' >> /app/start.sh
RUN echo 'nslookup $HOST || echo "DNS resolution failed"' >> /app/start.sh
RUN echo 'echo "Checking IP routes..."' >> /app/start.sh
RUN echo 'ip route || echo "Cannot check IP routes"' >> /app/start.sh
RUN echo 'echo "Setting explicit environment variables..."' >> /app/start.sh
RUN echo 'export PORT=5000' >> /app/start.sh
RUN echo 'echo "Starting the application..."' >> /app/start.sh
RUN echo 'node start-server.js' >> /app/start.sh
RUN chmod +x /app/start.sh

# Create a custom server script that can handle both TS and JS environments
RUN echo "console.log('Starting Jogja Smart Tour API server...');" > start-server.js
RUN echo "console.log('Database URL format:', process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:\/\/.*:.*@/, '://****:****@') : 'Not set');" >> start-server.js
RUN echo "console.log('Direct URL format:', process.env.DIRECT_URL ? process.env.DIRECT_URL.replace(/:\/\/.*:.*@/, '://****:****@') : 'Not set');" >> start-server.js
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
CMD ["/app/start.sh"]