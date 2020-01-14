class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  turnRight() {
    this.direction.turnRight();
  }

  turnUp() {
    this.direction.turnUp();
  }

  turnDown() {
    this.direction.turnDown();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();
    const [deltaX, deltaY] = this.direction.delta;
    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  grow() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    const [deltaX, deltaY] = this.direction.delta;
    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  isSnakeTouchedItself() {
    const snake = this.location;
    const head = snake.shift();
    const isCollide = function(position) {
      return head[0] == position[0] && head[1] == position[1];
    };
    return snake.some(isCollide);
  }

  isSnakeTouchedWall() {
    const head = this.location.pop();
    return (
      [NUM_OF_ROWS, 0].includes(head[1]) || [NUM_OF_COLS, 0].includes(head[0])
    );
  }
}
