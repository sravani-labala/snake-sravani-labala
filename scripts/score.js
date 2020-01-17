class ScoreBoard {
  #score;
  constructor(initialScore) {
    this.#score = initialScore;
  }
  update() {
    this.#score += 5;
  }
  get points() {
    return this.#score;
  }
}
