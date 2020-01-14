class Game {
  constructor(snake, ghostSnake, food, score) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = score;
  }

  isFoodEaten() {
    const [foodColId, foodRowId] = this.food.position;
    const [snakeColID, snakeRowId] = this.snake.location.pop();
    return snakeColID == foodColId && foodRowId == snakeRowId;
  }

  updateScore() {
    return this.score.update();
  }

  isSnakeTouchedItself() {
    const snake = this.snake.location;
    const head = snake.shift();
    const isCollide = function(position) {
      return head[0] == position[0] && head[1] == position[1];
    };
    return snake.some(isCollide);
  }

  isSnakeTouchedWall() {
    const head = this.snake.location.pop();
    return (
      [NUM_OF_ROWS, 0].includes(head[1]) || [NUM_OF_COLS, 0].includes(head[0])
    );
  }

  isGameOver() {
    return this.isSnakeTouchedItself() || this.isSnakeTouchedWall();
  }

  get status() {
    return this.score.points;
  }

  growSnake() {
    this.snake.grow();
  }

  updateFood() {
    const xPosition = Math.round(Math.random() * 90) + 5;
    const yPosition = Math.round(Math.random() * 50) + 5;
    this.food = new Food(xPosition, yPosition);
  }
}
