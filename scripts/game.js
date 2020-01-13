class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = 0;
  }

  isFoodEaten() {
    const [foodColId, foodRowId] = this.food.position;
    const [snakeColID, snakeRowId] = this.snake.location.pop();
    return snakeColID == foodColId && foodRowId == snakeRowId;
  }

  updateScore() {
    return ++this.score;
  }
}
