# Stage 1: Build
FROM node:21 AS build

WORKDIR /app

# Copy all files
COPY . .

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Generate Prisma client and build icons
RUN npx prisma generate
RUN npm run build:icons

# Stage 2: Production
FROM node:21 AS production

WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app /app

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]
