class Food {
  constructor(colId, rowId) {
    this.colId = colId;
    this.rowId = rowId;
  }

  get position() {
    return [this.colId, this.rowId];
  }

  update() {
    const xPosition = Math.round(Math.random() * 90) + 5;
    const yPosition = Math.round(Math.random() * 50) + 5;
    [this.colId, this.rowId] = [xPosition, yPosition];
  }
}
