FROM node:latest

WORKDIR /nursy_dashboard
COPY package*.json ./
RUN npm install -f
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
