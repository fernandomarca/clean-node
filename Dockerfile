FROM node:14
WORKDIR /usr/src/clean-node
COPY ./package.json .
RUN npm --only=prod
# COPY ./src ./src
# EXPOSE 5000
# CMD npm start