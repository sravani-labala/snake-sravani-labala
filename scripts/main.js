const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

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

const handleKeyPress = snake => {
  switch (event.key) {
    case 'ArrowLeft':
      snake.turnLeft();
      break;

    case 'ArrowRight':
      snake.turnRight();
      break;

    case 'ArrowUp':
      snake.turnUp();
      break;

    case 'ArrowDown':
      snake.turnDown();
      break;
  }
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};

const drawFood = function(food) {
  let [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.add('food');
};

const eraseFood = function(food) {
  let [colId, rowId] = food;
  const cell = getCell(colId, rowId);
  cell.classList.remove('food');
};

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
};

const setup = game => {
  attachEventListeners(game.snake);
  createGrids();
  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
  drawFood(game.food);
  drawScoreBoard(game.score);
};

const animateSnakes = (snake, ghostSnake) => {
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const randomlyTurnSnake = snake => {
  let x = Math.round(Math.random() * 150);
  if (x < 25) {
    snake.turnLeft();
    return;
  }
  if (x < 50) {
    snake.turnRight();
    return;
  }
  if (x < 75) {
    snake.turnUp();
    return;
  }
  if (x < 100) {
    snake.turnDown();
    return;
  }
};

const drawScoreBoard = function(score) {
  const scoreBoard = document.getElementById('score');
  scoreBoard.innerText = score;
};

const runGame = function(game) {
  randomlyTurnSnake(game.ghostSnake);
  animateSnakes(game.snake, game.ghostSnake);
  if (game.isFoodEaten()) {
    eraseFood(game.food.position);
    game.food.update();
    game.snake.grow();
    game.updateScore();
    drawScoreBoard(game.score);
    drawFood(game.food);
  }
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

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(5, 5);
  const game = new Game(snake, ghostSnake, food);
  setup(game);
  setInterval(runGame, 500, game);
};
