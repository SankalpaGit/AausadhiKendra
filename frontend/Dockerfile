FROM node24.1.0
WORKDIR /app
COPY . .
RUN npm install
RUN npm build
EXPOSE 3000
CMD ["npm", "start"]
