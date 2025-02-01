# syntax = docker/dockerfile:1

# Use a lightweight Node.js image
ARG NODE_VERSION=18.19.0
FROM node:${NODE_VERSION}-slim as base
LABEL fly_launch_runtime="Node.js"

# Set working directory
WORKDIR /app

# Install dependencies and build the application
FROM base as build

# Install build tools
RUN apt-get update -qq && apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    python-is-python3 \
    pkg-config && \
    rm -rf /var/lib/apt/lists/*

# Copy only the package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application code
COPY . .

# Build the application
RUN yarn build

# Prune dev dependencies
RUN yarn install --production --frozen-lockfile

# Create the final production image
FROM base

# Copy built application and production dependencies from the build stage
COPY --from=build /app /app

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["node", "dist/app.js"]