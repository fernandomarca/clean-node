FROM node:14
WORKDIR /usr/src/clean-node
COPY ./package.json .
RUN yarn --only=prod
COPY ./src ./src
EXPOSE 5000
CMD yarn start