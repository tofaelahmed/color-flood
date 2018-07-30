const assert = require('assert');

const Board = require('./board.js');

function Game(dimension, colors, originX = 0, originY = 0) {

  assert(!!dimension, 'dimension is required');
  assert(!!colors, 'colors is required');

  this.totalMoves = 0;
  this.moveSequence = [];
  this.printEachMove = false;
  this.colors = colors;
  this.originX = originX;
  this.originY = originY;
  this.board = new Board(dimension, colors);
  this.board.generateTiles();
};

Game.prototype.makeMove = function (replacementColor) {
  this.totalMoves++;
  this.moveSequence.push(replacementColor);

  let {originX, originY} = this;
  let targetColor = this.board.tiles[originX][originY];
  this.board.updateBoardState(originX, originY, targetColor, replacementColor);

  if (this.printEachMove) {
    console.log(`Move ${replacementColor}`);
    this.board.printBoard();
    console.log('\n');
  }
};

Game.prototype.isFinished = function () {
  let {originX, originY} = this;
  let originColor = this.board.tiles[originX][originY];
  let finished = true;

  for (let i = 0; i < this.board.dimension; i++) {
    if (!finished) {
      break;
    }

    let row = this.board.tiles[i];
    for (let j = 0; j < this.board.dimension; j++) {
      if (row[j] !== originColor) {
        finished = false;
        break;
      }
    }
  }

  return finished;
};

module.exports = Game;
