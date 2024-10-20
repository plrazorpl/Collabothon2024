FROM node:23   
WORKDIR /app

COPY package*.json ./

COPY . .    

RUN npm install

EXPOSE 80

CMD ["npm", "run", "dev"]