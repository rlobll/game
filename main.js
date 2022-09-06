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

let bulletList = []; // 총알들을 저장하는 리스트
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 20;
    this.y = spaceshipY;

    bulletList.push(this);
  };
  this.update = function () {};
}
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
    console.log("무슨키?", event.key);
    keysDown[event.key] = true;
  });
  document.addEventListener("keyup", function (event) {
    delete keysDown[event.key];

    if (event.key == "Arrowup") {
      createBullet(); // 총알생성
    }
  });
}

function createBullet() {
  console.log("총알생성");
  let b = new Bullet(); // 총알 하나 생성
  b.init();
  console.log("새로운총알리스트", bulletList);
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

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImag, bulletList[i].x, bulletList[i].y);
  }
}

function main() {
  update(); // 좌표값을 업데이트하고
  render(); // 그려주고
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();

// 방향키를 누면
// 우주선의 xy 좌표가 바뀌고
// 다시 render 그려준다

// 총알 만들기
// 1. 스페이스바를 누르면 총알 나오기
// 2. 총알 발사 = 총알의 y값이 --, 총알의 x값은? 스페이스바를 누른 순간의 우주선의 x좌표
// 3. 발사된 총알들은 총알 배열에 저장을 한다.
// 4. 모든 총알들은 x,y좌표값이 있어야 한다.
// 5. 총알 배열을 가지고 render 그려준다.
