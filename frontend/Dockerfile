FROM node:20.11.1-alpine

WORKDIR /app

COPY package.json .
#

COPY . .
RUN npm i
### EXPOSE 80
#
CMD ["npm", "run", "dev"]
