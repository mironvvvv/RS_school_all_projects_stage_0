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
let badFood = [];
let blackFood = [];
let lastBlackFoodScore = 100;



function createBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameBoard.appendChild(cell);
  }
}


function drawSnake() {
  snake.forEach(part => {
    const index = part.y * BOARD_SIZE + part.x;
    const snakeElement = gameBoard.children[index];
    snakeElement.classList.add('snake');
  });
}


function clearSnake() {
  [...gameBoard.children].forEach(cell => cell.classList.remove('snake'));
}


function moveSnake() {
  const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(newHead);

  // Проверяем, съела ли змейка съедобную еду
  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    scoreDisplay.textContent = score;
    generateFood(); // Генерация новой съедобной еды

    // Если счет больше или равен 100, добавляем несъедобную еду
    if (score >= 50) {
      generateBadFood(); // Генерируем одну несъедобную еду
    }
  } else {
    snake.pop(); // Удаляем последний сегмент, если еда не съедена
  }
  if (score >= 100 && score - lastBlackFoodScore >= 50) {
    generateBlackFood(); // Добавляем одну черную еду
    lastBlackFoodScore = score; // Обновляем счет для отслеживания добавления черной еды
  }

  // Проверяем на столкновение с несъедобной едой
  badFood.forEach((bad) => {
    if (newHead.x === bad.x && newHead.y === bad.y) {
      score = Math.max(0, score - 10);
      scoreDisplay.textContent = score;

      // Удаляем несъедобную еду после её поедания
      badFood = badFood.filter(b => b !== bad);
      generateBadFood();

      // Уменьшаем длину змейки, если есть что уменьшать
      if (snake.length > 1) {
        snake.pop();
      }

      // Если счёт достиг 0, завершаем игру
      if (score === 0) {
        clearInterval(gameInterval);
        alert('Game Over! Your score is: ' + score);
        
      }
    }
  });

  if (checkCollision()) {
    clearInterval(gameInterval);
    alert('Game Over! Your score is: ' + score);
    
  }
  if (checkCollision() || blackFood.some(black => newHead.x === black.x && newHead.y === black.y)) {
    clearInterval(gameInterval);
    endGame(score); // Передаем счёт в функцию завершения игры
  }
  
  blackFood.forEach((black) => {
    if (newHead.x === black.x && newHead.y === black.y) {
      clearInterval(gameInterval);
      alert('Game Over! You ate the deadly food!');
       
    }
  });
}


function checkCollision() {
  const head = snake[0];
  return (
    head.x < 0 || head.x >= BOARD_SIZE ||
    head.y < 0 || head.y >= BOARD_SIZE ||
    snake.slice(1).some(part => part.x === head.x && part.y === head.y)
  );
}


function generateFood() {
  food = {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE)
  };
  while (snake.some(part => part.x === food.x && part.y === food.y) || badFood.some(b => b.x === food.x && b.y === food.y)) {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
  }

  drawFood();
}


function drawFood() {
  const foodIndex = food.y * BOARD_SIZE + food.x;
  const foodElement = gameBoard.children[foodIndex];
  foodElement.classList.add('food');
}


function clearFood() {
  [...gameBoard.children].forEach(cell => cell.classList.remove('food'));
}

function generateBadFood() {
  let newBadFood = {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE)
  };

 
  while ((newBadFood.x === food.x && newBadFood.y === food.y) ||
         snake.some(part => part.x === newBadFood.x && part.y === newBadFood.y)) {
    newBadFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
  }
  
  badFood.push(newBadFood);
  drawBadFood();
}

function drawBadFood() {
  badFood.forEach(bad => {
    const badFoodIndex = bad.y * BOARD_SIZE + bad.x;
    const badFoodElement = gameBoard.children[badFoodIndex];
    badFoodElement.classList.add('bad-food');
  });
}


function clearBadFood() {
  [...gameBoard.children].forEach(cell => cell.classList.remove('bad-food'));
}

function generateBlackFood() {
  let newBlackFood = {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };

  // Убедимся, что черная еда не генерируется на месте змейки или другой еды
  while (
    snake.some(part => part.x === newBlackFood.x && part.y === newBlackFood.y) ||
    badFood.some(b => b.x === newBlackFood.x && b.y === newBlackFood.y) ||
    (newBlackFood.x === food.x && newBlackFood.y === food.y)
  ) {
    newBlackFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  }

  blackFood.push(newBlackFood); // Добавляем новую черную еду в массив
  drawBlackFood();
}

function drawBlackFood() {
  blackFood.forEach(black => {
    const blackFoodIndex = black.y * BOARD_SIZE + black.x;
    const blackFoodElement = gameBoard.children[blackFoodIndex];
    blackFoodElement.classList.add('black-food'); // Добавьте класс для черной еды
  });
}
function getScores() {
  let scores = localStorage.getItem('scores');
  return scores ? JSON.parse(scores) : [];
}

// Функция для сохранения результата
function saveScore(score, playerName) {
  let scores = getScores();
  const newScore = { score: score, name: playerName, date: new Date().toLocaleDateString() };
  if (scores.length >= 10) {
    scores = []; // Очищаем массив
}
  scores.push(newScore);

  // Сортируем по убыванию счета
  scores.sort((a, b) => b.score - a.score);

  // Ограничиваем до 10 результатов
  if (scores.length > 10) {
    scores = scores.slice(0, 10);
  }

  localStorage.setItem('scores', JSON.stringify(scores));
}

// Функция для отображения результатов
function displayScores() {
  const scores = getScores();
  const scoreTable = document.getElementById('score-table');
  const tbody = scoreTable.querySelector('tbody'); // Получаем тело таблицы
  tbody.innerHTML = '';

  scores.forEach((scoreEntry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${scoreEntry.name}</td>
      <td>${scoreEntry.score}</td>
      <td>${scoreEntry.date}</td>
    `;
    scoreTable.appendChild(row);
  });
}

// После завершения игры
function endGame(finalScore) {
  const playerName = prompt("Enter your name:"); // Запрос имени игрока
  saveScore(finalScore, playerName); // Сохранение результата
  displayScores(); // Отображение таблицы результатов
  startGame ();
}

function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  badFood = [];
  scoreDisplay.textContent = score;
  createBoard();
  generateFood();
  drawSnake();
  gameInterval = setInterval(() => {
    clearSnake(); 
    clearBadFood();
    moveSnake();  
    clearFood();
    drawSnake();  
    drawFood();  
    drawBadFood();
    drawBlackFood(); 
  }, SNAKE_SPEED);
  startButton.style.display = 'none';
}


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
      this.size = Math.floor(Math.random() * 20 + 5); 
      this.length = Math.floor(Math.random() * 10 + 5); 
      this.direction = this.getRandomDirection(); 
      this.body = Array.from({ length: this.length }, () => ({ x: this.x, y: this.y }));
      this.moveInterval = 0; 
      this.moveDelay = 1000;
      this.speed = 1; 
    }
  
    
    getRandomDirection() {
      const directions = [
        { x: 1, y: 0 }, 
        { x: -1, y: 0 }, 
        { x: 0, y: 1 }, 
        { x: 0, y: -1 } 
      ];
      return directions[Math.floor(Math.random() * directions.length)];
    }
  
    update() {
      
      if (this.moveInterval >= this.moveDelay) {
        this.direction = this.getRandomDirection();
        this.moveInterval = 0;
     
      } else {
        this.moveInterval++;
      }
  
      
      const newHead = {
        x: this.body[0].x + this.direction.x * this.size,
        y: this.body[0].y + this.direction.y * this.size
      };
  
      
      if (newHead.x < 0 || newHead.x > canvas.width || newHead.y < 0 || newHead.y > canvas.height) {
        this.direction = this.getRandomDirection(); 
      } else {
        
        this.body.unshift(newHead);
        if (this.body.length > this.length) {
          this.body.pop();
        }
      }
    }
  
    draw() {
      ctx.fillStyle = 'green'; 
      ctx.strokeStyle = 'black'; 
  
      this.body.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, this.size, this.size);
        ctx.strokeRect(segment.x, segment.y, this.size, this.size);
      });
    }
  }
  
  
  const backgroundSnakes = [];
  for (let i = 0; i < 10; i++) {
    backgroundSnakes.push(new SquareSnake());
  }
  let lastUpdateTime = 0;
const updateInterval = 500;
  
  function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    backgroundSnakes.forEach(snake => {
      snake.update();
      snake.draw();
    });
    
    requestAnimationFrame(animateBackground);
  }
  
  animateBackground();