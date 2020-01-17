class Food {
  #colId;
  #rowId;
  #previousFood;
  constructor(colId, rowId) {
    this.#colId = colId;
    this.#rowId = rowId;
    this.#previousFood = [0, 0];
  }

  get position() {
    return [this.#colId, this.#rowId];
  }

  get previousPosition() {
    return this.#previousFood.slice();
  }

  update() {
    this.#previousFood = [this.#colId, this.#rowId];
    this.#colId = Math.round(Math.random() * 100);
    this.#rowId = Math.round(Math.random() * 60);
  }
}
