FROM node:lts-alpine

copy ./ /home/suckson-music/app

workdir /home/suckson-music/app

RUN yarn install

CMD ["npm", "run", "start"]