class Game {
  grid = [];
  cross_turn;
  game_div;
  modal;
  game_stopped;

  circleWinMessage = 'Circle has won this game.';
  crossWinMessage = 'Cross has won this game.';
  drawMessage = 'Draw. Nobody has won this game.';

  /**
   * @param Modal modal 
   */
  constructor(
    modal
  ) {
    this.modal = modal;
    this.game_stopped = true;
  }

  start() {
    this.grid = [
      [1,1,1],
      [1,1,1],
      [1,1,1]
    ];
    this.cross_turn = true;
    this.game_stopped = false;
    this.updateGrid();
  }

  checkWinner(winner) {
    switch(winner) {
      case 0:
        this.modal.showMessage(this.circleWinMessage);
        break;
      case 2:
        this.modal.showMessage(this.crossWinMessage);
        break;
      case 1:
        if (this.gridComplete()) {
          this.modal.showMessage(this.drawMessage);
        }
    }
  }

  updateGrid() {
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) { 
        switch (this.grid[x][y]) {
          case 0:
            $('#'+x.toString()+y.toString()+'>.circle').fadeIn(300);
            $('#'+x.toString()+y.toString()+'>.cross').hide();
            break;
          case 1:
            $('#'+x.toString()+y.toString()+'>.circle').hide();
            $('#'+x.toString()+y.toString()+'>.cross').hide();
            break;
          case 2:
            $('#'+x.toString()+y.toString()+'>.circle').hide();
            $('#'+x.toString()+y.toString()+'>.cross').fadeIn(300);
            break;
        }
      }
    }
  }

  checkGrid() {
    for(var x = 0; x < 3; x++) {
      if (this.grid[x][0] === 0 && this.grid[x][1] === 0 && this.grid[x][2] === 0) {
        this.game_stopped = true;
        return 0;
      }
      if (this.grid[x][0] === 2 && this.grid[x][1] === 2 && this.grid[x][2] === 2) {
        this.game_stopped = true;
        return 2;
      }
    }

    for(var y = 0; y < 3; y++) {
      if (this.grid[0][y] === 0 && this.grid[1][y] === 0 && this.grid[2][y] === 0) {
        this.game_stopped = true;
        return 0;
      }
      if (this.grid[0][y] === 2 && this.grid[1][y] === 2 && this.grid[2][y] === 2) {
        this.game_stopped = true;
        return 2;
      }
    }

    if (this.grid[0][0] === 0 && this.grid[1][1] === 0 && this.grid[2][2] === 0) {
      this.game_stopped = true;
      return 0;
    }
    if (this.grid[0][0] === 2 && this.grid[1][1] === 2 && this.grid[2][2] === 2) {
      this.game_stopped = true;
      return 2;
    }

    if (this.grid[0][2] === 0 && this.grid[1][1] === 0 && this.grid[2][0] === 0) {
      this.game_stopped = true;
      return 0;
    }
    if (this.grid[0][2] === 2 && this.grid[1][1] === 2 && this.grid[2][0] === 2) {
      this.game_stopped = true;
      return 2;
    }
    this.gridComplete();
    return 1;
  }

  gridComplete() {
    for(var x = 0; x < 3; x++) {
      for(var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          return false;
        }
      }
    }
    this.game_stopped = true;
    return true;
  }

}
