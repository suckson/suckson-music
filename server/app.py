# save this as app.py
from flask import Flask, escape, request
from musicdl import musicdl
import logging
from flask import jsonify

logger=logging.getLogger('sihy')



app = Flask(__name__)

config = {'logfilepath': 'musicdl.log', 'savedir': 'downloaded', 'search_size_per_source': 5, 'proxies': {}}

target_srcs = [
    'kugou', 'kuwo', 'qqmusic', 'qianqian', 'fivesing',
    'netease', 'migu', 'joox', 'yiting',
]

client = musicdl.musicdl(config=config)
@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return 'Hello, {escape(name)}!'

@app.route('/search', methods=['POST'])
def search():
   if request.method == 'POST':
        search = request.form.get('value')
        search_results = client.search(search, target_srcs)
        print(search_results)
        return search_results


# 启动服务
if __name__ == '__main__':
   app.run(debug = True)