FROM node:lts-alpine

copy ./ /home/suckson-music
workdir /home/suckson-music/app

RUN yarn install

CMD ["npm", "run", "start"]