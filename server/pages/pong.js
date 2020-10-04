import react from "react";
import{useEffect} from "react"
import Router from 'next/router'
import queryString from "query-string";

const Pong = () => {

const paddleWidth = 10;
const paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;
let upArrowPressed2 = false;
let downArrowPressed2 = false;
let playable = true;

function getParams(){
	console.log(queryString.parse(Router.asPath.split(/\?/)[1]))
	return queryString.parse(Router.asPath.split(/\?/)[1]);
	
}

function drawNet(ctx, net) {

  ctx.fillRect(net.x, net.y, net.width, net.height);
}

function drawScore(x, y, score, ctx) {
  ctx.fillStyle = '#fff';
  ctx.font = '35px sans-serif';
   ctx.fillText(score, x, y);
}

function drawPaddle(x, y, width, height, color, ctx) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, radius, color, ctx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true); 
  ctx.closePath();
  ctx.fill();
}

function keyDownHandler(event) {
  switch (event.keyCode) {
    case 87:
      upArrowPressed = true;
      break;
    case 83:
      downArrowPressed = true;
      break;
    case 38:
      upArrowPressed2 = true;
      break;
    case 40:
      downArrowPressed2 = true;
      break;
     
  }
}

function keyUpHandler(event) {
  switch (event.keyCode) {
    case 87:
      upArrowPressed = false;
      break;
    case 83:
      downArrowPressed = false;
      break;
    case 38:
      upArrowPressed2 = false;
      break;
    case 40:
      downArrowPressed2 = false;
      break;
      
  }
}

function reset(ball, canvas) {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 7;

  ball.velocityX = -ball.velocityX;
  ball.velocityY = -ball.velocityY;
}

function collisionDetect(player, ball) {
  player.top = player.y;
  player.right = player.x + player.width;
  player.bottom = player.y + player.height;
  player.left = player.x;

  ball.top = ball.y - ball.radius;
  ball.right = ball.x + ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;

  return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}

function update(user, user2, canvas, ball) {
  
  if (upArrowPressed && user.y  > 0) {
    user.y -= 8;  
  } else if (downArrowPressed && (user.y < canvas.height - user.height) ){
    user.y += 8;
  }
  if (upArrowPressed2  && user2.y > 0) {
    user2.y -= 8;
  } else if (downArrowPressed2  && (user2.y < canvas.height - user2.height)) {
    user2.y += 8;
  }


  if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
    ball.velocityY = -ball.velocityY;
  }

   if (ball.x + ball.radius >= canvas.width) {
    user.score += 1;
    if(user.score >= 5){
    	playable = false
    	console.log("winner user")
    	let params = getParams();
    	params.winner = true
    	Router.push({pathname: '/game', query: params})
    }
    reset(ball, canvas);
  }

  if (ball.x - ball.radius <= 0) {
    user2.score += 1;
    if(user2.score >= 5){
    	playable = false
    	console.log("winner user2")
    	let params = getParams();
    	params.winner = false
    	Router.push({pathname: '/game', query: params})
    }
    reset(ball, canvas);
  }

  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  let player = (ball.x < canvas.width / 2) ? user : user2;
  if (collisionDetect(player, ball)) {
    let angle = 0;

    if (ball.y < (player.y + player.height / 2)) {
      angle = -1 * Math.PI / 4;
    } else if (ball.y > (player.y + player.height / 2)) {
      angle = Math.PI / 4;
    }

    ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);

    ball.speed += 0.2;
  }
}

function render(ctx, canvas, user, user2, ball, net) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawNet(ctx, net);
  drawScore(canvas.width / 4, canvas.height / 6, user.score, ctx);
  drawScore(3 * canvas.width / 4, canvas.height / 6, user2.score, ctx);
  drawPaddle(user.x, user.y, user.width, user.height, user.color, ctx);
  drawPaddle(user2.x, user2.y, user2.width, user2.height, user2.color, ctx);
  
  drawBall(ball.x, ball.y, ball.radius, ball.color, ctx);
}

function gameLoop(user, user2, canvas, ball, ctx, net) {
  if(!playable)return;
  update(user, user2, canvas, ball);
  render(ctx, canvas, user, user2, ball, net);
}
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
 
    const net = {
      x: canvas.width / 2 - 2,
      y: 0,
      width: 4,
      height: canvas.height,
      color: "#FFF"
    };

  const user = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FFF',
    score: 0
  };

  const user2 = {
    x: canvas.width - (paddleWidth + 10),
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FFF',
    score: 0
  };


  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 7,
    speed: 7,
    velocityX: 5,
    velocityY: 5,
    color: '#05EDFF'
  };
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
    setInterval(() => gameLoop(user, user2, canvas, ball, ctx, net), 1000 / 60);

  }, [])

  return (
    <canvas id="canvas" width="600" height="400">
    </canvas>
  )

}

export default Pong
