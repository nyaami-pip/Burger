FROM node:16.13.0

ENV NODE_ENV production
ENV PORT 3000

# Create app directory
RUN mkdir -p /app/frontend
WORKDIR /app/frontend

# Copy application to / directory and install dependencies
COPY package.json /app/frontend/
RUN npm install

# Copying source files
COPY . /app/frontend

# Building app
RUN npm run build

# Expose port 8082 to the outside once the container has launched
EXPOSE 3000

# Running the app
CMD "npm" "run" "start"