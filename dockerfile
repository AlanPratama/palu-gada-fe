# Use a Node.js image to build the project
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the pnpm-lock.yaml file and the package.json file
# (Make sure you have a package.json in your project root)
COPY package.json ./

# Copy the rest of the application files to the container
COPY . ./

RUN npm install

# Build the Vite project
RUN npm run build

# Use a lightweight web server image to serve the application
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose the port on which Nginx will run
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]