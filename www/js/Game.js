class Game {
  grid = [];
  cross_turn;
  game_div

  /**
   * 
   * @param {object} game_div 
   */
  constructor(
    game_div
  ) {

  }

  start() {
    this.grid = [
      [1,1,1],
      [1,1,1],
      [1,1,1]
    ];
    this.cross_turn = true

  }

  click(event) {
    var field = event.target.id;

    var x = parseInt(field[0]);
    var y = parseInt(field[1]);

    if (this.grid[x][y] == 1) {
      if (this.cross_turn) {
        this.grid[x][y] = 2;
      } else {
        this.grid[x][y] = 0;
      }
      this.cross_turn = !this.cross_turn;
    }

    this.updateGrid();
    console.log(this.checkGrid());
  }

  updateGrid() {
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) { 
        switch (this.grid[x][y]) {
          case 0:
            document.getElementById(x.toString()+y.toString()).classList.add('circle');
            document.getElementById(x.toString()+y.toString()).classList.remove('cross');
            break;
          case 1:
            document.getElementById(x.toString()+y.toString()).classList.remove('circle');
            document.getElementById(x.toString()+y.toString()).classList.remove('cross');
            break;
          case 2:
            document.getElementById(x.toString()+y.toString()).classList.remove('circle');
            document.getElementById(x.toString()+y.toString()).classList.add('cross');
            break;
        }
      }
    }
  }

  checkGrid() {
    for(var x = 0; x < 3; x++) {
      if (this.grid[x][0] === 0 && this.grid[x][1] === 0 && this.grid[x][2] === 0) {
        return 0;
      }
      if (this.grid[x][0] === 2 && this.grid[x][1] === 2 && this.grid[x][2] === 2) {
        return 2;
      }
    }

    for(var y = 0; y < 3; y++) {
      if (this.grid[0][y] === 0 && this.grid[1][y] === 0 && this.grid[2][y] === 0) {
        return 0;
      }
      if (this.grid[0][y] === 2 && this.grid[1][y] === 2 && this.grid[2][y] === 2) {
        return 2;
      }
    }

    if (this.grid[0][0] === 0 && this.grid[1][1] === 0 && this.grid[2][2] === 0) {
      return 0;
    }
    if (this.grid[0][0] === 2 && this.grid[1][1] === 2 && this.grid[2][2] === 2) {
      return 2;
    }

    if (this.grid[0][2] === 0 && this.grid[1][1] === 0 && this.grid[2][0] === 0) {
      return 0;
    }
    if (this.grid[0][2] === 2 && this.grid[1][1] === 2 && this.grid[2][0] === 2) {
      return 2;
    }

    return 1;
  }

}
