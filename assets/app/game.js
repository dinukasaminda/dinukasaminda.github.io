

var WIDTH;
var HEIGHT;
var canvas;
var con;
var g;
var pxs = [];
var rint = 60;
var count =10;
function play_trigger1() {
  //var audio = {};
  $('#buzzer').get(0).play();

}
$('#demo').click(function(e){
   var x = e.pageX - e.target.offsetLeft;
   var y = e.pageY - e.target.offsetTop;

   var x1=x,y1=y;
  for(var i = 0; i < pxs.length; i++) {
    var dsr = Math.pow(parseInt(x1-pxs[i].x),2)+Math.pow(parseInt(y1-pxs[i].y),2);
    var radius_ = Math.sqrt(dsr); 
    if(radius_<= pxs[i].r){
      console.log('trigger :'+i);
      pxs[i].color_1="rgb(255,255,255)";
      pxs[i].reset();
      play_trigger1();
      break;
    }
    console.log("dist:"+radius_+", r"+pxs[i].r);
  }
  console.log('tap=x:'+x+",y:"+y);
});
$(document).ready(function(){
  WIDTH = window.innerWidth-100;
  HEIGHT = window.innerHeight-100;
  $('#container').width(WIDTH).height(HEIGHT);
  canvas = document.getElementById('demo');
  $(canvas).attr('width', WIDTH).attr('height',HEIGHT);
  con = canvas.getContext('2d');
  for(var i = 0; i < count; i++) {
    pxs[i] = new Circle();
    pxs[i].reset();
  }
  setInterval(draw,rint);
});

function draw() {
  con.clearRect(0,0,WIDTH,HEIGHT);
  for(var i = 0; i < pxs.length; i++) {
    pxs[i].fade();
    pxs[i].move();
    pxs[i].draw();
  }
}

function Circle() {
  this.random_color1=function function_name() {
      var colorR = Math.floor((Math.random() * 256));
      var colorG = Math.floor((Math.random() * 256));
      var colorB = Math.floor((Math.random() * 256));
      return "rgb(" + colorR + "," + colorG + "," + colorB + ")";
  }
  this.s = {ttl:2000, xmax:3, ymax:2, rmax:200, rt:1, xdef:960, ydef:540, xdrift:2, ydrift: 2, random:true, blink:true};
  this.color_1 = this.random_color1();
  // fill vars
  
  var opacityFill = "." + Math.floor(Math.random() * 5) + 1;

  this.reset = function() {
    this.x = (this.s.random ? WIDTH*Math.random() : this.s.xdef);
    this.y = (this.s.random ? HEIGHT*Math.random() : this.s.ydef);
    this.r = ((this.s.rmax-1)*Math.random()) + 1;
    this.dx = (Math.random()*this.s.xmax) * (Math.random() < 0.5 ? -1 : 1);
    this.dy = (Math.random()*this.s.ymax) * (Math.random() < 0.5 ? -1 : 1);
    this.hl = (this.s.ttl/rint)*(this.r/this.s.rmax);
    this.rt = Math.random()*this.hl;
    this.s.rt = Math.random()+1;
    this.stop = Math.random()*0.2+0.4;
    this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
    this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
    this.opacityFill = opacityFill;
    this.color_1 = this.random_color1();
    
  };

  this.fade = function() {
    this.rt += this.s.rt;
  };

  this.draw = function() {
    if(this.s.blink && (this.rt <= 0 || this.rt >= this.hl)){
      this.s.rt = this.s.rt*-1;
    }
    else if(this.rt >= this.hl){
      this.reset();
    }
    con.beginPath();
    con.arc(this.x,this.y,this.r,0,Math.PI*2,true);
    con.globalAlpha = opacityFill;
    var newo = 1-(this.rt/this.hl);
    var cr = this.r*newo;

    con.fillStyle = this.color_1;
    con.fill();

    con.closePath();
  };

  this.move = function() {
    this.x += (this.rt/this.hl)*this.dx;
    this.y += (this.rt/this.hl)*this.dy;
    if(this.x > WIDTH || this.x < 0){
      this.dx *= -1;
    } 
    if(this.y > HEIGHT || this.y < 0){
      this.dy *= -1;
    } 
    if(this.r<100){
      this.r++;
    }else{
      this.r=0;
      this.reset();
    }
  };

  this.getX = function() { return this.x; };
  this.getY = function() { return this.y; };
}