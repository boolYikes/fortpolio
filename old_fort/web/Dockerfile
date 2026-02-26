FROM node:22-alpine

WORKDIR /app

# Backend install
COPY backend ./backend
WORKDIR /app/backend
RUN npm install

# Client install + build
WORKDIR /app
COPY client ./client
WORKDIR /app/client
RUN npm install
RUN npm run build
COPY media_assets/ ./client/dist/

WORKDIR /app/backend
CMD ["npm", "run", "start"]
