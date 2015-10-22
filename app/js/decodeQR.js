var canvas = null;
var ctx = null;

function load() {
  if (supported()) {
    initCanvas(100, 100);
    qrcode.callback = read;
  } else {
    document.getElementById('main').innerHTML = '<p>Your browser is not supported</p>';
  }
}

function handleImage(file) {
  var reader = new FileReader();
  reader.onload = (function(f) {
    return function(e) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      qrcode.decode(e.target.result);
    };
  })(file[0]);
  reader.readAsDataURL(file[0]);
}

function initCanvas(width, height) {
  canvas = document.getElementById('qr-canvas');
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);
}

function read(decodedMsg) {
  var html = '<br>Decoded Message:<br/>';
  if (decodedMsg.indexOf('http') === 0) {
    html += '<a target="_blank" href="' + decodedMsg + '">' + decodedMsg + '</a>';
  } else {
    html += '<b>' + htmlEntities(decodedMsg) + '</b>';
  }
  document.getElementById('result').innerHTML = html;
}

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function supported() {
  var elem = document.createElement('canvas');
  var canvasSupport = !!(elem.getContext('2d'));
  var fileSupport = !!(window.File && window.FileReader);
  return (canvasSupport && fileSupport);
}
