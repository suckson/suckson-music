var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const proxy = require("http-proxy-middleware").createProxyMiddleware;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use("/fivesing", proxy(`https://wsaudiobssdlbig.yun.kugou.com`));
app.use("/joox", proxy(`https://ak-hk.stream.music.joox.com`));
app.use("/kugou", proxy(`https://webfs.ali.kugou.com`));
app.use("/kuwo", proxy(`http://other.web.nf01.sycdn.kuwo.cn`));
app.use("/migu", proxy(`https://app.pd.nf.migu.cn`));
app.use("/netease", proxy(`http://m701.music.126.net`));
app.use("/yiting", proxy(`http://m701.music.126.net`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
