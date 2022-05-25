class SingleGame extends Game {

  player = 2;
  bot = 0;
  botx;
  boty;
  playerturn;

  beforeStart() {
    this.player = $('.player-box .custom-radio.box.checked').data('value');
    this.bot = 0;
    this.playerturn = true;
    if (this.player == 0) {
      this.bot = 2;
      this.playerturn = false;
    }
  }

  afterStart() {
    if (!this.playerturn) {
      this.botmoves();
    }
  }

  botmoves() {
    if (this.game_stopped) {
      return;
    }
    switch (this.bot) {
      case 0: 
        this.minWo();
        break;
      case 2:
        this.maxWo();
        break;
    }
    this.grid[this.botx][this.boty] = this.bot;
    this.playerturn = true;
    this.cross_turn = !this.cross_turn;

    this.updateGrid();
    this.checkWinner(this.checkGrid());
  }

  click (event) {
    if (this.playerturn) {
      if (this.game_stopped) {
        return;
      }
      var field = event.target.id;
      var x = parseInt(field[0]);
      var y = parseInt(field[1]);

      if (this.grid[x][y] == 1) {
        
        this.grid[x][y] = this.player;

        this.cross_turn = !this.cross_turn;

        this.updateGrid();
        this.checkWinner(this.checkGrid());

        setTimeout(this.botmoves(), 1000);
      }
    }
  }

  minWo() {
    if (this.checkGrid() == 0) {
      return 0;
    }
    var minvalue = 999;
    
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          this.grid[x][y] = 0;
          var value = this.max();
          if (value < minvalue) {
            minvalue = value;
            this.botx = x;
            this.boty = y;
          }
          this.grid[x][y] = 1;
          this.game_stopped = false;
        }
      } 
    }

    return minvalue;
  }

  min() {
    if (this.checkGrid() == 0) {
      return 0
    }
    var minvalue = 999;
    
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          this.grid[x][y] = 0;
          var value = this.max();
          if (value < minvalue) {
            minvalue = value;
          }
          this.grid[x][y] = 1;
          this.game_stopped = false;
        }
      } 
    }

    return minvalue;
  }

  maxWo() {
    if (this.checkGrid() == 2) {
      return 2
    }
    var maxvalue = -999;
    
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          this.grid[x][y] = 2;
          var value = this.min();
          if (value > maxvalue) {
            maxvalue = value;
            this.botx = x;
            this.boty = y;
          }
          this.grid[x][y] = 1;
          this.game_stopped = false;
        }
      } 
    }

    return maxvalue;
  }

  max() {
    if (this.checkGrid() == 2) {
      return 2
    }
    var maxvalue = -999;
    
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          this.grid[x][y] = 2;
          var value = this.min();
          if (value > maxvalue) {
            maxvalue = value;
          }
          this.grid[x][y] = 1;
          this.game_stopped = false;
        }
      } 
    }

    return maxvalue;
  }

}

$(document).ready(function(){
  modal = new Modal();
  game = new SingleGame(modal);
  game.beforeStart();
  game.start();
  game.afterStart();

  $('.field').click(function(event){
    game.click(event);
  });

  $('#btn-new-game').click(function(){
    game.beforeStart();
    game.start();
    game.afterStart();
  });
});