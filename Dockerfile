FROM node

ENV MONGO_DB_USERNAME=admin 

RUN mkdir -p testapp 

COPY . /testapp

CMD ["node", "/testapp/server.js"]