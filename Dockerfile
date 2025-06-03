# Use Node.js LTS base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy remaining source code
COPY . .

# Expose your app port (default: 3000, update if needed)
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]