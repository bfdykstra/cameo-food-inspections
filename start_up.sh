#!/bin/sh

docker exec app ./node_modules/.bin/sequelize db:migrate
docker exec app ./node_modules/.bin/sequelize db:seed:all