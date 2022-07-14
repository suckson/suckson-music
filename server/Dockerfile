FROM python:3.9.5-slim
copy ./ /home/suckson-music

workdir /home/suckson-music/server

RUN cd /home/suckson-music/server

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ENV FLASK_APP=app.py

EXPOSE 5000

CMD ["flask", "run", "-h", "0.0.0.0"]