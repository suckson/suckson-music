FROM python:3.7

copy ./ /home/suckson-music/server

workdir /home/suckson-music/server

RUN pip3 install --upgrade pip -i https://pypi.doubanio.com/simple/

RUN pip3 install -i https://pypi.doubanio.com/simple/ -r requirements.txt

ENV FLASK_APP=app.py

ENV FLASK_RUN_HOST 0.0.0.0


CMD ["flask", "run", "-h", "0.0.0.0", "-p", "8000"]