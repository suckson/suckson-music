FROM python:3.7
FROM node:lts-alpine
FROM nginx
 
COPY ./ /opt/src/suckson-music
WORKDIR /opt/src
 
RUN cd /server &&  pip install -r requirements.txt

RUN cd /app && yarn

CMD ["python", "app.py"， "npm", "run", "start"]