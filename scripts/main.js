const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;
const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;
const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const handleKeyPress = game => {
  switch (event.key) {
    case 'ArrowLeft':
      game.turnSnake('turnLeft');
      break;

    case 'ArrowRight':
      game.turnSnake('turnRight');
      break;

    case 'ArrowUp':
      game.turnSnake('turnUp');
      break;

    case 'ArrowDown':
      game.turnSnake('turnDown');
      break;
  }
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const drawScoreBoard = function(score) {
  const scoreBoard = document.getElementById('score');
  scoreBoard.innerText = score;
};

const gameOver = function(points) {
  const gameBoard = document.getElementById('gameBoard');
  const finishGame = document.getElementById('gameOver');
  gameBoard.style.display = 'none';
  finishGame.style.display = 'block';
  const score = document.createElement('p');
  score.innerText = `your score is ${points}`;
  finishGame.appendChild(score);
};

const drawFood = function(food) {
  let [colId, rowId] = food;
  const cell = getCell(colId, rowId);
  cell.classList.add('food');
};

const eraseFood = function(food) {
  let [colId, rowId] = food;
  const cell = getCell(colId, rowId);
  cell.classList.remove('food');
};

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const moveAndDrawSnake = function(snake) {
  eraseTail(snake);
  drawSnake(snake);
};

const setup = game => {
  attachEventListeners(game);
  createGrids();
  const { snake, ghostSnake, food, score } = game.status;
  drawSnake(snake);
  drawSnake(ghostSnake);
  drawFood(food.current);
  drawScoreBoard(score);
};

const animateSnakes = (snake, ghostSnake) => {
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const randomlyTurnSnake = game => {
  const directions = ['turnLeft', 'turnRight', 'turnUp', 'turnDown'];
  const pickDirection = Math.round(Math.random() * 3);
  game.turnGhostSnake(directions[pickDirection]);
};

const runGame = function(game) {
  randomlyTurnSnake(game);
  const { snake, ghostSnake, food, score } = game.status;
  animateSnakes(snake, ghostSnake);
  game.update();
  eraseFood(food.previous);
  drawScoreBoard(score);
  drawFood(food.current);
};

const initSnake = () => {
  const snakePosition = [
    [20, 25],
    [21, 25],
    [22, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), 'snake');
};

const initGhostSnake = () => {
  const ghostSnakePosition = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];
  return new Snake(ghostSnakePosition, new Direction(SOUTH), 'ghost');
};

const start = function(game) {
  const intervalId = setInterval(() => {
    if (game.isGameOver()) {
      clearInterval(intervalId);
      gameOver(game.status.score);
      return;
    }
    runGame(game);
  }, 200);
};

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(20, 20);
  const score = new ScoreBoard(0);
  const game = new Game(snake, ghostSnake, food, score);
  setup(game);
  start(game);
};
