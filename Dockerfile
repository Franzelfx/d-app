# Step 1: Use an official Node.js image as the base
FROM node:20 as builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Step 4: Install Angular CLI globally within the image
RUN npm install -g @angular/cli

# Step 5: Install project dependencies
RUN npm install

# Step 6: Copy the rest of your app's source code to the working directory
COPY . .

# Step 7: Build the project for production
# This step is optional and can be skipped if you only want to run the dev server
# RUN ng build --prod

# Step 8: Serve the app using Angular CLI
# Note: In a real-world scenario, you'd want to serve static files with Nginx or another web server
CMD ["ng", "serve", "--host", "0.0.0.0"]
