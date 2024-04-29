# Use an official Node.js runtime as a parent image
FROM node:22-alpine3.18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next application with docker environment
# RUN npx vite --port 5173 --host=0.0.0.0
# RUN npm run dev


EXPOSE 5173


# Set the command to start the application with docker environment
# CMD ["npm", "run", "start"]

# CMD ["npm", "vite", "--port", "5173", "--host=0.0.0.0"]
