# Use Node.js base image
FROM node:20-alpine

# Install netcat (for wait-for.sh)
RUN apk add --no-cache netcat-openbsd

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code and wait-for script
COPY . .

# Make wait-for.sh executable
RUN chmod +x ./wait-for.sh

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Run app
CMD ["./wait-for.sh", "kafka:9092", "--", "npm", "run", "start:dev"]
