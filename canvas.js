var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var radius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var moveX = 2;
var moveY = -2;
var boxHeight = 15;
var boxWidth = 100;
var boxMove = (canvas.width-boxWidth)/2;
var rightPressed = false;
var leftPressed = false;
var BrickRow =4;
var BrickCol =6;
var BrickWidth=60;
var BrickHeight=20;
var BrickPadding =10;
var BrickTop=30;
var BrickLeft=20;
var score = 0;

var bricks = [];
for(var r=0; r<BrickRow; r++) {
    bricks[r] = [];
    for(var c=0; c<BrickCol; c++) {
        bricks[r][c] = { x: 0, y: 0, status:1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var mouseX = e.clientX;
    if(mouseX > 0 && mouseX < canvas.width) {
        boxMove = mouseX - boxWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 39) {
        rightPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 39) {
        rightPressed = false;
    }
}

function Detect(){
	for(var r=0; r<BrickRow; r++) {
    for(var c=0; c<BrickCol; c++) {
      var b = bricks[r][c];
      if(b.status == 1) {
        if(x > b.x && x < b.x+BrickWidth && y > b.y && y < b.y+BrickHeight) {
          moveY = -moveY;
          b.status = 0;
          score++;
          if(score == BrickRow * BrickCol){
          	alert("you win");
          	location.reload();
          }
        }
      }
    }
  }
}

function Score(){
	ctx.font = "14px Verdana";
	ctx.fillStyle = "#99b3ff";
	ctx.fillText("Score:"+score,8,20);
}

function Ball() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "#99b3ff";
    ctx.fill();
    ctx.closePath();
}
function Box() {
    ctx.beginPath();
    ctx.rect(boxMove, canvas.height-boxHeight,boxWidth, boxHeight);
    ctx.fillStyle = "#99b3ff";
    ctx.fill();
    ctx.closePath();
}

function Bricks(){
	for(var r=0;r<BrickRow;r++){
		for(var c=0;c<BrickCol;c++){
			if(bricks[r][c].status == 1){
				var BrickX=(r*(BrickHeight+BrickPadding))+BrickTop;
				var BrickY=(c*(BrickWidth+BrickPadding))+BrickLeft;
				bricks[r][c].x=BrickY;
				bricks[r][c].y=BrickX;
				ctx.beginPath();
				ctx.rect(BrickY,BrickX,BrickWidth,BrickHeight);
				ctx.fillStyle="#99b3ff";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Bricks();
	Ball();
    Box();
    Score();
    Detect();
    
    if(x + moveX > canvas.width-radius || x + moveX< radius) {
        moveX = -moveX;
    }
	if(y+moveY<radius){
		moveY= -moveY;
	}else if(y+moveY>canvas.height-radius){
		if(x > boxMove && x < boxMove+boxWidth){
			moveY= -moveY;
		}
		else{
		alert("Game Over");
		location.reload(true);
		}
	}
    
    if(rightPressed && boxMove < canvas.width-boxWidth) {
        boxMove += 8;
    }
    else if(leftPressed && boxMove > 0) {
        boxMove -= 8;
    }
    
    x += moveX;
    y += moveY;
}

setInterval(Draw, 10);