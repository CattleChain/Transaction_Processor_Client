# use latest version of node
# service is under development
FROM node:10

# set working directory
WORKDIR /dist

#copy package json
COPY package*.json ./

#installing dependencies
RUN npm install

# bundle source code
COPY . .

# build the project
RUN npm run build

# expose port 3000
EXPOSE 3000

# start app with yarn
CMD ["npm", "start"]
