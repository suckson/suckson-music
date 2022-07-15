/**
 * Created by zhan on 2017/8/22.
 */

function $(s) {
  return document.querySelectorAll(s);
}



var lis = $('#list li');
var size = 128;
var box = $('#box')[0];
var height, width;
var canvas = document.createElement('canvas');
box.appendChild(canvas);
var ctx = canvas.getContext('2d');
var Dots = [];
var oAdd = $('#add')[0];
var oUpload = $('#upload')[0];

var mv = new MusicVisualizer({
  size: size,
  visualizer: draw
})

////////////////////////////////////////
oAdd.onclick = function () {
  oUpload.click();
}
//读取本地文件，相较于服务器读取文件，少了ajax过程，其它一样
oUpload.onchange = function () {
  var file = this.files[0];
  var fr = new FileReader();
  fr.onload = function (e) {
    mv.play(e.target.result);
  }
  fr.readAsArrayBuffer(file);
}
///////////////////////////////////////////

for (var i = 0; i < lis.length; i++) {
  lis[i].onclick = function () {
    for (var j = 0; j < lis.length; j++) {
      lis[j].className = '';
    }
    this.className = 'selected';
    mv.play('/media/' + this.title)
  }
}


function random(m, n) {
  return Math.round(Math.random() * (n - m) + m);
}
function getDots() {
  Dots = [];
  for (var i = 0; i < size; i++) {
    var x = random(0, width);
    var y = random(0, height);
    var color = 'rgba(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ',0.3)';
    Dots.push({
      x: x,
      y: y,
      dx: random(1, 4),
      color: color,
      cap: 0
    })
  }

}
var line;
function resize() {
  height = box.clientHeight;
  width = box.clientWidth;
  canvas.height = height;
  canvas.width = width;
  line = ctx.createLinearGradient(0, 0, 0, height);
  line.addColorStop(0, 'red');
  line.addColorStop(0.5, 'yellow');
  line.addColorStop(1, 'green');
  getDots();
}
resize();
window.onresize = resize;
//16进制颜色转为RGB格式,传入16进制颜色代码与透明度
function colorRgb(color, opacity) {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; //十六进制颜色值的正则表达式
  opacity = opacity < 0 ? 0 : opacity; //颜色范围控制
  opacity = opacity > 1 ? 1 : opacity;
  if (color && reg.test(color)) {
    if (color.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return "rgba(" + sColorChange.join(",") + "," + opacity + ")";
  } else {
    return color;
  }
}


function draw(arr) {
  console.log(arr);
  ctx.clearRect(0, 0, width, height);
  var w = width / size;
  for (var i = 0; i < size; i++) {
    var o = Dots[i];
    ctx.fillStyle = line;
    if (draw.type == 'column') {
      var h = arr[i] / 256 * height;
      var cw = w * 0.6;
      capH = cw > 10 ? 10 : cw;
      ctx.fillRect(w * i, height - h, cw, h);
      ctx.fillRect(w * i, height - (o.cap + capH), cw, capH);
      o.cap--;
      if (o.cap < 0) {
        o.cap = 0;
      }
      if (h > 0 && o.cap < h + 40) {
        o.cap = h + 40 > height - capH ? height - capH : h + 40;
      }
    } else if (draw.type == 'dot') {
      ctx.beginPath();
      var r = 10 + arr[i] / 256 * (height > width ? height : width) / 30;
      ctx.arc(o.x, o.y, r, 0, Math.PI * 2, false);
      var g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
      g.addColorStop(0, '#fff');
      g.addColorStop(1, o.color);
      ctx.fillStyle = g;
      ctx.fill();
      o.x += o.dx;
      o.x = o.x > width ? 0 : o.x;
    } else if (draw.type == 'circular') {
      for (var i = 0; i < (arr.length); i++) {
        var value = arr[i];
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, value * 0.8, 0, 400, false);
        ctx.lineWidth = 2; //线圈粗细
        var colorArray = ['#f82466', '#00FFFF', '#AFFF7C', '#FFAA6A', '#6AD5FF', '#D26AFF', '#FF6AE6', '#FF6AB8', '#FF6A6A', "#7091FF"];
        var colorRandom = Math.floor(Math.random() * colorArray.length);
        ctx.strokeStyle = (1, colorRgb(colorArray[colorRandom], value / 1000)); //颜色透明度随值变化
        ctx.stroke(); //画空心圆
        ctx.closePath();
      }
    }else if (draw.type == 'line') {
      // var arr = new Uint8Array(128); //长度为128无符号数组用于保存getByteFrequencyData返回的频域数据
      var colorArray = ['#f82466', '#00FFFF', '#AFFF7C', '#FFAA6A', '#6AD5FF', '#D26AFF', '#FF6AE6', '#FF6AB8', '#FF6A6A', "#7091FF"];
        var colorRandom = Math.floor(Math.random() * colorArray.length);
        ctx.strokeStyle = (1, colorRgb(colorArray[colorRandom],  1000)); //颜色透明度随值变化
      // ctx.strokeStyle = '#f82466';
      ctx.lineWidth = 1; //线粗细
      ctx.beginPath();
      for (var i = 0; i < (arr.length); i++) {
         var value = arr[i];
         ctx.lineTo(i * 14, value + 180);
          //把能量传出
      };
      ctx.stroke();
      ctx.closePath();
    }
  }
}

draw.type = 'column'

var types = $('#type li');
for (var i = 0; i < types.length; i++) {
  types[i].onclick = function () {
    for (var j = 0; j < types.length; j++) {
      types[j].className = '';
    }
    this.className = 'selected';
    draw.type = this.getAttribute('data-type')
    getDots();
  }
}

$('#volume')[0].onchange = function () {
  mv.changeVolumn(this.value / this.max);

}
$('#volume')[0].onchange();

