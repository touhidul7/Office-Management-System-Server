# Use Debian-based Node.js image instead of Alpine
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install

# Copy Prisma schema (needed before prisma generate)
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy all source code
COPY . .

# Expose server port
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
