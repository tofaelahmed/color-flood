function Board(dimension, colors) {
  this.dimension = dimension;
  this.colors = colors;
  this.tiles = [];
}

Board.prototype.generateTiles = function () {
  for (let i = 0; i < this.dimension; i++) {
    this.tiles[i] = [];
    for (let j = 0; j < this.dimension; j++) {
      this.tiles[i][j] = this.getRandomColor();
    }
  }
};

Board.prototype.printBoard = function () {
  for (let i = 0; i < this.dimension; i++) {
    console.log(this.tiles[i].join(' '));
  }
  console.log('\n');
};

Board.prototype.getRandomColor = function () {
  return Math.floor(Math.random() * this.colors);
};

Board.prototype.updateBoardState = function (originX, originY, targetColor, replactementColor) {

  if (targetColor === replactementColor) {
    return;
  }

  if (this.tiles[originX][originY] !== targetColor) {
    return;
  }

  this.tiles[originX][originY] = replactementColor;

  if (originX > 0) {
    this.updateBoardState(originX - 1, originY, targetColor, replactementColor);
  }

  if (originY > 0) {
    this.updateBoardState(originX, originY - 1, targetColor, replactementColor);
  }

  if (originX < this.dimension - 1) {
    this.updateBoardState(originX + 1, originY, targetColor, replactementColor);
  }

  if (originY < this.dimension - 1) {
    this.updateBoardState(originX, originY + 1, targetColor, replactementColor);
  }
};

Board.prototype.getConnectedCount = function (originX = 0, originY = 0) {

  let north = 0;
  let south = 0;
  let east = 0;
  let west = 0;

  let value = this.tiles[originX][originY];
  this.tiles[originX][originY] = Number.MAX_SAFE_INTEGER;

  if (originY > 0 && this.tiles[originX][originY - 1] === value) {
    north = this.getConnectedCount(originX, originY - 1);
  }

  if ((originY < this.dimension - 1) && this.tiles[originX][originY + 1] === value) {
    south = this.getConnectedCount(originX, originY + 1);
  }

  if (originX > 0 && this.tiles[originX - 1][originY] === value) {
    west = this.getConnectedCount(originX - 1, originY);
  }

  if ((originX < this.dimension - 1) && this.tiles[originX + 1][originY] === value) {
    east = this.getConnectedCount(originX + 1, originY);
  }

  return north + south + east + west + 1;

};

module.exports = Board;
