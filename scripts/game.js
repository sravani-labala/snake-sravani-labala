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
      [NUM_OF_ROWS - 1, 0].includes(head[1]) ||
      [NUM_OF_COLS - 1, 0].includes(head[0])
    );
  }

  isGameOver() {
    return this.isSnakeTouchedItself() || this.isSnakeTouchedWall();
  }

  get status() {
    return {
      score: this.score.points,
      snake: {
        location: this.snake.location,
        previousTail: this.snake.previousTail.slice(),
        species: this.snake.species
      },
      ghostSnake: {
        location: this.ghostSnake.location,
        previousTail: this.ghostSnake.previousTail.slice(),
        species: this.ghostSnake.species
      },
      food: {
        previous: this.food.previousPosition,
        current: this.food.position
      }
    };
  }

  moveSnakes() {
    this.snake.move();
    this.ghostSnake.move();
  }

  growSnake() {
    this.snake.grow();
  }

  updateFood() {
    this.food.update();
  }

  update() {
    if (this.isFoodEaten()) {
      this.updateFood();
      this.growSnake();
      this.updateScore();
    }
  }
}
