class Snake {
  #positions;
  #direction;
  #type;
  #previousTail;
  constructor(positions, direction, type) {
    this.#positions = positions.slice();
    this.#direction = direction;
    this.#type = type;
    this.#previousTail = [0, 0];
  }

  get location() {
    return this.#positions.slice();
  }

  get species() {
    return this.#type;
  }

  turnLeft() {
    this.#direction.turnLeft();
  }

  turnRight() {
    this.#direction.turnRight();
  }

  turnUp() {
    this.#direction.turnUp();
  }

  turnDown() {
    this.#direction.turnDown();
  }

  get head() {
    return this.#positions[this.#positions.length - 1];
  }

  move() {
    const [headX, headY] = this.head;
    this.#previousTail = this.#positions.shift();
    const [deltaX, deltaY] = this.#direction.delta;
    this.#positions.push([headX + deltaX, headY + deltaY]);
  }

  grow() {
    const [headX, headY] = this.head;
    const [deltaX, deltaY] = this.#direction.delta;
    this.#positions.push([headX + deltaX, headY + deltaY]);
  }

  get previousTailPosition() {
    return this.#previousTail;
  }
}
