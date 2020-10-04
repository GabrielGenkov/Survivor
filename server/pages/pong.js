import react from "react";
import{useEffect} from "react" 

const Pong = () => {



/* some extra variables */

const paddleWidth = 10;
const paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;
let upArrowPressed2 = false;
let downArrowPressed2 = false;


/* objects declaration ends */

/* drawing functions */
// function to draw net
function drawNet(ctx, net) {

  ctx.fillRect(net.x, net.y, net.width, net.height);
}

// function to draw score
function drawScore(x, y, score, ctx) {
  ctx.fillStyle = '#fff';
  ctx.font = '35px sans-serif';
   ctx.fillText(score, x, y);
}

// function to draw paddle
function drawPaddle(x, y, width, height, color, ctx) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// function to draw ball
function drawBall(x, y, radius, color, ctx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true); 
  ctx.closePath();
  ctx.fill();
}

/* drawing functions end */

/* moving Paddles */
// add an eventListener to browser window


// gets activated when we press down a key
function keyDownHandler(event) {
  // get the keyCode
  switch (event.keyCode) {
    // "up arrow" key
    case 87:
      // set upArrowPressed = true
      upArrowPressed = true;
      break;
    // "down arrow" key
    case 83:
      downArrowPressed = true;
      break;
    case 38:
      // set upArrowPressed = true
      upArrowPressed2 = true;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed2 = true;
      break;
     
  }
}
// gets activated when we release the key
function keyUpHandler(event) {
  switch (event.keyCode) {
    // "up arrow" key
    case 87:
      upArrowPressed = false;
      break;
    // "down arrow" key
    case 83:
      downArrowPressed = false;
      break;
    case 38:
      // set upArrowPressed = true
      upArrowPressed2 = false;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed2 = false;
      break;
      
  }
}

/* moving paddles section end */

// reset the ball
function reset(ball, canvas) {
  // reset ball's value to older values
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 7;

  // changes the direction of ball
  ball.velocityX = -ball.velocityX;
  ball.velocityY = -ball.velocityY;
}

// collision Detect function
function collisionDetect(player, ball) {
  // returns true or false
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

// update function, to update things position
function update(user, user2, canvas, ball) {
  
  
  // move the paddle
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


  // check if ball hits top or bottom wall
  if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
    ball.velocityY = -ball.velocityY;
  }

   // if ball hit on right wall
   if (ball.x + ball.radius >= canvas.width) {
    // then user scored 1 point
    user.score += 1;
    reset(ball, canvas);
  }

  // if ball hit on left wall
  if (ball.x - ball.radius <= 0) {
    // then user2 scored 1 poinZ
    user2.score += 1;
    reset(ball, canvas);
  }

  // move the ball
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // collision detection on paddles
  let player = (ball.x < canvas.width / 2) ? user : user2;
  if (collisionDetect(player, ball)) {
    let angle = 0;

    // if ball hit the top of paddle
    if (ball.y < (player.y + player.height / 2)) {
      angle = -1 * Math.PI / 4;
    } else if (ball.y > (player.y + player.height / 2)) {
      // if it hit the bottom of paddle
      angle = Math.PI / 4;
    }

    /* change velocity of ball according to on which paddle the ball hitted */
    ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);

    // increase ball speed
    ball.speed += 0.2;
  }
}

// render function draws everything on to canvas
function render(ctx, canvas, user, user2, ball, net) {
  // set a style
  ctx.fillStyle = "#000"; /* whatever comes below this acquires black color (#000). */
  // draws the black board
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw net
  drawNet(ctx, net);
  // draw user score
  drawScore(canvas.width / 4, canvas.height / 6, user.score, ctx);
  // draw user2 score
  drawScore(3 * canvas.width / 4, canvas.height / 6, user2.score, ctx);
  // draw user paddle
  drawPaddle(user.x, user.y, user.width, user.height, user.color, ctx);
  // draw user2 paddle
  drawPaddle(user2.x, user2.y, user2.width, user2.height, user2.color, ctx);
  

  // draw ball
  drawBall(ball.x, ball.y, ball.radius, ball.color, ctx);
}

// gameLoop
function gameLoop(user, user2, canvas, ball, ctx, net) {
  // update() function here
  update(user, user2, canvas, ball);
  // render() function here
    render(ctx, canvas, user, user2, ball, net);
}
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
      

  /* objects */
  // net
    const net = {
      x: canvas.width / 2 - 2,
      y: 0,
      width: 4,
      height: canvas.height,
      color: "#FFF"
    };

// user paddle
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



// ball
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