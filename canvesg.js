console.log('canvasg init c at dinuka saminda 2017');

var win_width=undefined;
var win_height=undefined;


var canvas = document.getElementById('main_canv');
canvas.onmousedown = function(){
  return false;
};
var c = canvas.getContext('2d');


var mouse = {
	x:undefined,
	y:undefined
};

window.addEventListener('mousemove',
	function(event){
		mouse.x=event.x;
		mouse.y=event.y;

});

window.addEventListener('resize',function(){
	init();
});


var max_r=80;
var min_r =3;

var colorArray =['#2c3e50','#e74c3c','#ecf0f1','#3498db','#298089'];

function randomIntFromRange(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);

}
function randomColor(colors){
	return colors[Math.floor(Math.random()*colors.length)];

}

$('#main_canv').click(function(){
	console.log('aaaa');

	win_width=window.innerWidth;
	win_height=window.innerHeight;
	canvas.width=win_width;
	canvas.height=win_height;
	
	for (var i=0;i<5;i++){
		var r = Math.random()*20+1;
		var x =randomIntFromRange(mouse.x-10,mouse.x+10);
		var y = randomIntFromRange(mouse.y-10,mouse.y+10);
		var dx = randomIntFromRange(-2,2);
		//var dy = (Math.random()-0.5);
		var dy=1;
		
		var color_style =colorArray[Math.floor(Math.random()*colorArray.length)];
		var circle = new Circle(x,y,dx,dy,r,color_style);

		circleArry.push(circle);
	}
});
var circleArry=[];
var friction = 0.9;
var gravity=1;
var count=100;
init();
function init(){
	win_width=window.innerWidth;
	win_height=window.innerHeight;
	canvas.width=win_width;
	canvas.height=win_height;
	circleArry=[];
	for (var i=0;i<count;i++){
	var r = Math.random()*20+1;
	var x = Math.random()*(win_width -2*r) + r;
	var y = Math.random()*(win_height-2*r) + r;
	var dx = randomIntFromRange(-2,2);
	//var dy = (Math.random()-0.5);
	var dy=1;
	
	var color_style =colorArray[Math.floor(Math.random()*colorArray.length)];
	var circle = new Circle(x,y,dx,dy,r,color_style);

	circleArry.push(circle);
}
}

$('#banner').css('top',win_height/2);
$('#banner').css('left',0);
$('#banner').css('right',0);


function Circle(x,y,dx,dy,r,color_style){
	this.x = x;
	this.y = y;
	this.dx=dx;
	this.dy=dy;
	this.before_hity=y;
	this.r=r;
	this.color_style=color_style;
	this.vy=true;
	this.min_r=r;
	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
		c.fillStyle=color_style;
		c.fill();
		c.stroke();
		c.closePath();
	}
	this.update=function(){

		if(this.vy==true){
			
			if(this.y+this.r+this.dy>win_height ){
				this.dy=-this.dy*friction;
				
				if(Math.abs(this.dy)<gravity/5){this.vy=false;this.dy=0;}

				
			}else{
				this.dy +=gravity;
			}																	
		}
		this.y+=this.dy;
		if(this.x+this.r>win_width || this.x-this.r<0){this.dx=-this.dx;}
		this.x+=this.dx;

		/*
		if(this.y+this.r>win_height || this.y-this.r<0){this.dy=-this.dy;}
		this.y+=this.dy;

		//interactive
		
		if((mouse.x - this.x < 50 &&  mouse.x - this.x > -50)&& 
		(mouse.y - this.y < 50 &&  mouse.y - this.y > -50)){
			if(this.r<max_r){
				this.r +=2;
			}
			
		}else if (this.r>this.min_r){
			this.r-=1;
		}*/

		this.draw();
	}
}




function update(){
	c.clearRect(0,0,win_width,win_height);
	
	for (var i=0;i<circleArry.length;i++){
		circleArry[i].update();

	}
	

	
}
function animate(){
	requestAnimationFrame(animate);
	update();
}

animate();
