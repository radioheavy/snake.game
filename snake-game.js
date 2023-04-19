const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gridSize = 20;
let snake = [
  { x: 10, y: 10 }
];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

highScoreDisplay.textContent = `Rekor: ${highScore}`;

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  
  if (head.x === food.x && head.y === food.y) {
    // Yemi yediğinde, yeni yem pozisyonu belirle
    food.x = Math.floor(Math.random() * gridSize);
    food.y = Math.floor(Math.random() * gridSize);

    // Skoru arttır ve güncelle
    score++;
    scoreDisplay.textContent = `Skor: ${score}`;

    // Rekor skoru güncelle
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      highScoreDisplay.textContent = `Rekor: ${highScore}`;
    }
  } else {
    snake.pop(); // Kuyruğun son elemanını kaldır
  }

  // Yılanın başını yeni pozisyona taşı
  snake.unshift(head);

  // Çarpışma kontrolü
  if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize) {
    // Eğer yılan tahtanın dışına çıkarsa, oyunu yeniden başlat
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    scoreDisplay.textContent = `Skor: ${score}`;
  }

  // Yılanın kendisiyle çarpışmasını kontrol et
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      // Eğer yılan kendine çarparsa, oyunu yeniden başlat
      snake = [{ x: 10, y: 10 }];
      dx = 0;
      dy = 0;
      score = 0;
      scoreDisplay.textContent = `Skor: ${score}`;
    }
  }

  draw();
}

function draw() {
  gameBoard.innerHTML = '';

  // Yılanı çiz
  snake.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.left = `${segment.x * 20}px`;
    snakeElement.style.top = `${segment.y * 20}px`;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });

  // Yemi çiz
  const foodElement = document.createElement('div');
  foodElement.style.left = `${food.x * 20}px`;
  foodElement.style.top = `${food.y * 20}px`;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

function changeDirection(event) {
  if (event.key === 'ArrowUp' && dy === 0) {
    dx = 0;
    dy = -1;
  } else if (event.key === 'ArrowDown' && dy === 0) {
  dx = 0;
  dy = 1;
  } else if (event.key === 'ArrowLeft' && dx === 0) {
  dx = -1;
  dy = 0;
  } else if (event.key === 'ArrowRight' && dx === 0) {
  dx = 1;
  dy = 0;
  }
  }
  
  document.addEventListener('keydown', changeDirection);
  setInterval(update, 100);
