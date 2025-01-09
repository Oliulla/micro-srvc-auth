# Use the official Node.js 18 image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production=false

# Install @nestjs/cli globally
RUN yarn global add @nestjs/cli

# Copy the rest of the application code
COPY . .

# Run prisma generate to generate the Prisma client
RUN yarn prisma generate

# Build the NestJS application
RUN yarn build

# Expose the application port (default: 3000)
EXPOSE 3000

# Define the command to start the application
CMD ["yarn", "start:prod"]
