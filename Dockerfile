FROM node:12.22.1-alpine as cdc-poc

WORKDIR /code

COPY . /code

RUN npm install

CMD ["npm", "run", "prd"]
