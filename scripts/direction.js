class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnLeft() {
    if (this.heading != 0) this.heading = 2;
  }

  turnRight() {
    if (this.heading != 2) this.heading = 0;
  }

  turnUp() {
    if (this.heading != 3) this.heading = 1;
  }

  turnDown() {
    if (this.heading != 1) this.heading = 3;
  }
}
