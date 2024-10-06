const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-btn');

const BOARD_SIZE = 20;
const SNAKE_SPEED = 200;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameInterval;

// Инициализация игровой доски
function createBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameBoard.appendChild(cell);
  }
}

// Отображение змейки на доске
function drawSnake() {
  snake.forEach(part => {
    const index = part.y * BOARD_SIZE + part.x;
    const snakeElement = gameBoard.children[index];
    snakeElement.classList.add('snake');
  });
}

// Удаление старых частей змейки перед её обновлением
function clearSnake() {
  [...gameBoard.children].forEach(cell => cell.classList.remove('snake'));
}

// Движение змейки
function moveSnake() {
  const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    scoreDisplay.textContent = score;
    generateFood();
  } else {
    snake.pop();
  }

  if (checkCollision()) {
    clearInterval(gameInterval);
    alert('Game Over! Your score is: ' + score);
  }
}

// Проверка на столкновение змейки с границами или самой собой
function checkCollision() {
  const head = snake[0];
  return (
    head.x < 0 || head.x >= BOARD_SIZE ||
    head.y < 0 || head.y >= BOARD_SIZE ||
    snake.slice(1).some(part => part.x === head.x && part.y === head.y)
  );
}

// Генерация еды в случайной позиции
function generateFood() {
  food = {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE)
  };
  drawFood();
}

// Отображение еды на доске
function drawFood() {
  const foodIndex = food.y * BOARD_SIZE + food.x;
  const foodElement = gameBoard.children[foodIndex];
  foodElement.classList.add('food');
}

// Очистка предыдущей еды перед её новым отображением
function clearFood() {
  [...gameBoard.children].forEach(cell => cell.classList.remove('food'));
}

// Запуск игры
function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  scoreDisplay.textContent = score;
  createBoard();
  generateFood();
  gameInterval = setInterval(() => {
    clearSnake();
    moveSnake();
    clearFood();
    drawSnake();
    drawFood();
  }, SNAKE_SPEED);
  startButton.style.display = 'none';
}

// Управление направлениями змейки
window.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y !== 1) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y !== -1) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x !== 1) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x !== -1) direction = { x: 1, y: 0 };
      break;
  }
});

// Кнопка для начала игры
startButton.addEventListener('click', startGame);
const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snakes = [];

class SquareSnake {
    constructor() {
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      this.size = Math.floor(Math.random() * 20 + 5); // Размер клетки
      this.length = Math.floor(Math.random() * 10 + 5); // Длина змеи
      this.direction = this.getRandomDirection(); // Направление змеи
      this.body = Array.from({ length: this.length }, () => ({ x: this.x, y: this.y }));
      this.moveInterval = 0; // Таймер для поворота
      this.moveDelay = 1000; // Интервал движения
      this.speed = 1; // Скорость, кратная размеру клетки
    }
  
    // Генерация случайного направления
    getRandomDirection() {
      const directions = [
        { x: 1, y: 0 }, // вправо
        { x: -1, y: 0 }, // влево
        { x: 0, y: 1 }, // вниз
        { x: 0, y: -1 } // вверх
      ];
      return directions[Math.floor(Math.random() * directions.length)];
    }
  
    update() {
      // Таймер для смены направления
      if (this.moveInterval >= this.moveDelay) {
        this.direction = this.getRandomDirection();
        this.moveInterval = 0;
     
      } else {
        this.moveInterval++;
      }
  
      // Перемещение змеи
      const newHead = {
        x: this.body[0].x + this.direction.x * this.size,
        y: this.body[0].y + this.direction.y * this.size
      };
  
      // Проверка на столкновение с краями холста
      if (newHead.x < 0 || newHead.x > canvas.width || newHead.y < 0 || newHead.y > canvas.height) {
        this.direction = this.getRandomDirection(); // Изменяем направление при столкновении
      } else {
        // Добавляем новый сегмент головы и удаляем последний сегмент
        this.body.unshift(newHead);
        if (this.body.length > this.length) {
          this.body.pop();
        }
      }
    }
  
    draw() {
      ctx.fillStyle = 'green'; // Цвет змеи
      ctx.strokeStyle = 'black'; // Рамка змеи
  
      this.body.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, this.size, this.size);
        ctx.strokeRect(segment.x, segment.y, this.size, this.size);
      });
    }
  }
  
  // Создаем змей для фона
  const backgroundSnakes = [];
  for (let i = 0; i < 10; i++) {
    backgroundSnakes.push(new SquareSnake());
  }
  let lastUpdateTime = 0;
const updateInterval = 500;
  // Анимация змей на фоне
  function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    backgroundSnakes.forEach(snake => {
      snake.update();
      snake.draw();
    });
    
    requestAnimationFrame(animateBackground);
  }
  
  animateBackground();
  