# Use the official Node.js 16 image as the base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /quaestio

# Copy the package.json and yarn.lock files
COPY package.json package-lock.json ./

# Install the app's dependencies
RUN npm install

# Copy the rest of the app's files
COPY . .

# Expose port 3000 for the app to listen on
EXPOSE 8080

# Start the app
CMD ["npm", "run", "production"]