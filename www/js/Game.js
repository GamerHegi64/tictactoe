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
      ['1','1','1'],
      ['1','1','1'],
      ['1','1','1']
    ];
    this.cross_turn = true

  }

  click(event) {
    var field = '00';
    console.log(event.target);

    x = field[0];
    y = field[1];

    if (this.grid[x][y] === '1') {
      if (this.cross_turn) {
        this.grid[x][y] = '2';
      } else {
        this.grid[x][y] = '0';
      }
    }

  }

  updateGrid() {
    for (x = 0; x < 3; x++) {
      for (y = 0; y < 3; y++) {
        switch (this.grid[x][y]) {
          case '0':
            document.getElementById(toString(x)+toString(y)).classList.add('circle');
            document.getElementById(toString(x)+toString(y)).classList.remove('cross');
            break;
          case '1':
            document.getElementById(toString(x)+toString(y)).classList.remove('circle');
            document.getElementById(toString(x)+toString(y)).classList.remove('cross');
            break;
          case '2':
            document.getElementById(toString(x)+toString(y)).classList.remove('circle');
            document.getElementById(toString(x)+toString(y)).classList.add('cross');
            break;
        }
      }
    }
  }

}
