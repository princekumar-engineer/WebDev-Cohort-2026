# Stage 1: Base image with shared configurations
FROM node:22-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# Stage 2: Development Stage (Installs ALL dependencies, including devDependencies)
FROM base AS development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"] 

# Stage 3: Production Stage (Installs only production dependencies, keeps image tiny)
FROM base AS production
RUN npm ci --omit=dev
COPY . .
USER node # Security best practice: avoid running as root in production
EXPOSE 3000
CMD ["npm", "start"]