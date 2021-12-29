FROM node

# Create app directory
RUN mkdir -p /app/backend
WORKDIR /app/backend

# Copy application to / directory and install dependencies
COPY package.json /app/backend/
RUN npm install

# Copying source files
COPY . /app/backend

# Building app
RUN npm run build

# Expose port 8082 to the outside once the container has launched
EXPOSE 8082

# what should be executed when the Docker image is launching
CMD [ "node", "dist/main" ]