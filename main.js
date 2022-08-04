//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

// 1. 이미지 불러오기
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
// 2. 우주선 좌표 정하기
let spaceshipImageX = canvas.width / 2 - 30; //170
let spaceshipImageY = canvas.height - 60; //640

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "img/background.jpg";

  spaceshipImage = new Image();
  spaceshipImage.src = "img/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "img/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "img/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "img/gameOver.jpg";
}

let keysDown = {};

function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
  });
  document.addEventListener("keyup", function (event) {
    delete keysDown[event.key];
  });
}

function update() {
  if ("ArrowRight" in keysDown) {
    spaceshipImageX += 2; //우주선 이동 속도
  } //오른쪽
  if ("ArrowLeft" in keysDown) {
    spaceshipImageX -= 2; //우주선 이동 속도
  } //왼쪽

  if (spaceshipImageX <= 0) {
    spaceshipImageX = 0;
  }
  if (spaceshipImageX >= canvas.width - 60) {
    spaceshipImageX = canvas.width - 60;
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipImageX, spaceshipImageY);
}

function main() {
  update(); // 좌표값을 업데이트하고
  render(); // 그려주고
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();
