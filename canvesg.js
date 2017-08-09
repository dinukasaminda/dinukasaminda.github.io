console.log('canvasg init');

var win_width=undefined;
var win_height=undefined;


var canvas = document.getElementById('main_canv');

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
/*
c.fillStyle = 'rgba(255,0,0,.5)';
c.fillRect(100,100,200,200);

c.fillStyle = 'rgba(255,255,0,.5)';
c.fillRect(200,200,200,200);


c.beginPath();
c.moveTo(50,300);
c.lineTo(300,100);
c.lineTo(400,300);

c.strokeStyle ='#f1f1f1'; //any css style
c.stroke();

for(var i=0;i<100;i++){
	var x = Math.random()*win_width;
	var y = Math.random()*win_height;

	c.beginPath();
	c.arc(x,y,30,0,Math.PI*2,false);
	c.stroke();

}
*/

var max_r=80;
var min_r =3;

var colorArray =['#2c3e50','#e74c3c','#ecf0f1','#3498db','#298089'];


var circleArry=[];
init();
function init(){
	win_width=window.innerWidth;
	win_height=window.innerHeight;
	canvas.width=win_width;
	canvas.height=win_height;
	circleArry=[];
	for (var i=0;i<800;i++){
	var r = Math.random()*20+1;
	var x = Math.random()*(win_width -2*r) + r;
	var y = Math.random()*(win_height-2*r) + r;
	var dx = (Math.random()-0.5);
	var dy = (Math.random()-0.5);
	var color_style =colorArray[Math.floor(Math.random()*colorArray.length)];
	var circle = new Circle(x,y,dx,dy,r,color_style);

	circleArry.push(circle);
}
}

$('#banner').css('top',win_height/2);
$('#banner').css('left',win_width/4);
function Circle(x,y,dx,dy,r,color_style){
	this.x = x;
	this.y = y;
	this.dx=dx;
	this.dy=dy;
	this.r=r;
	this.color_style=color_style;

	this.min_r=r;
	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
		c.fillStyle=color_style;
		c.fill();
	}
	this.update=function(){
		if(this.x+this.r>win_width || this.x-this.r<0){this.dx=-this.dx;}
		if(this.y+this.r>win_height || this.y-this.r<0){this.dy=-this.dy;}
		this.x+=this.dx;
		this.y+=this.dy;

		//interactive
		
		if((mouse.x - this.x < 50 &&  mouse.x - this.x > -50)&& 
		(mouse.y - this.y < 50 &&  mouse.y - this.y > -50)){
			if(this.r<max_r){
				this.r +=2;
			}
			
		}else if (this.r>this.min_r){
			this.r-=1;
		}

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