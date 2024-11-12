# Step 1: Build the frontend application
FROM node:latest AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the build files to the NGINX server
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh


# Expose the port that NGINX will run on
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
