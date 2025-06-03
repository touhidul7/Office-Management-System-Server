# Use Node.js LTS base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install

# Copy Prisma schema before running prisma generate
COPY prisma ./prisma

# Run postinstall (will trigger prisma generate)
RUN npm run postinstall

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "index.js"]
