const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = 2;
let yDirection = 2;

const userStart = [230, 10];
const currentUserPosition = userStart;

const ballStart = [270, 40];
const currentBallPosition = ballStart;


class Block {
    constructor(xAxis, yAxis) {
        this.left = xAxis;
        this.right = xAxis + blockWidth;
        this.bottom = yAxis;
        this.top = yAxis + blockHeight;
    }
} 

const blocks = [];

for (let i = 270; i >= 210; i -= 30 ){
    for(let j = 10; j <= 450; j  += 110){
        blocks.push(new Block(j, i));
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = j + 'px';
        block.style.bottom = i + 'px';
        grid.appendChild(block);
    }
}

const user = document.createElement('div');
user.classList.add('user');
user.style.left = userStart[0] + 'px';
user.style.bottom = userStart[1] + 'px';
grid.appendChild(user);

const ball = document.createElement('div');
ball.classList.add('ball');
ball.style.left = ballStart[0] + 'px';
ball.style.bottom = ballStart[1] + 'px';
grid.appendChild(ball);


drawUser = () => {
    user.style.left = currentUserPosition[0] + 'px';
    user.style.bottom = currentUserPosition[1] + 'px';
}

drawBall = () => {
    ball.style.left = currentBallPosition[0] + 'px'
    ball.style.bottom = currentBallPosition[1] + 'px'
  }

// Moving user block
function moveUser(e){
    switch (e.key){
        case 'ArrowLeft':
            if(currentUserPosition[0] >= 10){
                currentUserPosition[0] -= 10;
                drawUser();
            }
            break;

        case 'ArrowRight':
            if(currentUserPosition[0] <= 450){
                currentUserPosition[0] += 10;
                drawUser();
            }     
            break;       
    }
}

document.addEventListener("keydown", moveUser);
// !Moving user block

function moveBall(){
    currentBallPosition[0] += xDirection;
    currentBallPosition[1] += yDirection;
    drawBall();
    checkHitted();
}

movingTimer = setInterval( moveBall, 10);

function checkHitted(){
    blocksQuery = document.querySelectorAll('.block');
    blocks.forEach((block, index) => {
        if(currentBallPosition[0] > block.left && 
            currentBallPosition[0] < block.right  &&
            currentBallPosition[1] + ballDiameter > block.bottom &&
            currentBallPosition[1] + ballDiameter < block.top ){
                blocksQuery[index].classList.remove('block')
                blocks.splice(index, 1);
                console.log(blocks.length);
                if(blocks.length === 0){
                    document.querySelector(".result").textContent="Congratulations! You won!";
                    clearInterval(movingTimer);
                    return;
                }
                
                changeDirection();
                return;
            }
    });


    if(currentBallPosition[0] > currentUserPosition[0] && 
        currentBallPosition[0] < currentUserPosition[0] + blockWidth &&
        currentBallPosition[1] <= currentUserPosition[1]+blockHeight){
            changeDirection();
        }

    if ( (currentBallPosition[0] > boardWidth - ballDiameter) || (currentBallPosition[0] < 0 ) || (currentBallPosition[1] > boardHeight - ballDiameter)){
        changeDirection();
    }

    if(currentBallPosition[1] < 2){
        document.querySelector(".result").textContent="You lost :(";
        clearInterval(movingTimer);
        document.removeEventListener("keydown", moveUser);
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      yDirection = -2
      return
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2
      return
    }
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2
      return
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2
      return
    }
  }