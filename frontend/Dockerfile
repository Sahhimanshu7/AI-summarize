# pull official base image
FROM node:21 as BUILD_IMAGE

# set working directory
WORKDIR /app/react-app 

# install app dependencies
COPY package.json .

# Silent clean install of npm
RUN npm install

COPY . .

# Build production
RUN npm run build

## Start the app on port 3000
# CMD serve -s build -l 3000

FROM node:21-alpine as PRODUCTION_BUILD
WORKDIR /app/react-app

COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist
EXPOSE 3000 

COPY package.json .
COPY vite.config.js .
RUN npm install
CMD ["npm", "run", "preview"]