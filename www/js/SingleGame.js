class SingleGame extends Game {

  player = 2;
  bot = 0;
  botx;
  boty;
  botfields = [];
  playerturn;
  maxbotdepth;

  beforeStart() {
    this.maxbotdepth = 3;
    this.botfields = [];

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

    this.maxbotdepth = parseInt(this.getFreeFields() / 2.5);
    if (this.maxbotdepth < 1) {
      this.maxbotdepth = 1; 
    }

    console.log(this.maxbotdepth);
    
    switch (this.bot) {
      case 0: 
        this.minWo();
        break;
      case 2:
        this.maxWo();
        break;
    }
    console.log(this.botfields);
    var field = this.botfields[Math.floor(Math.random()*this.botfields.length)]
    this.botx = field.x;
    this.boty = field.y;
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

      if (isNaN(x) || isNaN(y)) {
        return;
      }

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
    if (this.checkGrid() != 1 || this.gridComplete()) {
      return this.checkGrid();
    }
    var minvalue = 3;
    
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          this.grid[x][y] = 0;
          var value = this.max();
          if (value == minvalue) {
            this.botfields.push({'x':x, 'y':y});
          } else if (value < minvalue) {
            minvalue = value;
            this.botfields = [];
            this.botfields.push({'x':x, 'y':y});
          }
          this.grid[x][y] = 1;
          this.game_stopped = false;
        }
      } 
    }

    return minvalue;
  }

  min(depth = this.maxbotdepth) {
    if (this.checkGrid() != 1 || this.gridComplete() || depth <= 0) {
      return this.checkGrid();
    }
    var minvalue = 3;
    depth--;

    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          this.grid[x][y] = 0;
          var value = this.max(depth);
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
    if (this.checkGrid() != 1 || this.gridComplete()) {
      return this.checkGrid();
    }
    var maxvalue = -1;
    
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          this.grid[x][y] = 2;
          var value = this.min();
          if (value == maxvalue) {
            this.botfields.push({'x':x, 'y':y});
          } else if (value > maxvalue) {
            maxvalue = value;
            this.botfields = [];
            this.botfields.push({'x':x, 'y':y});
          }
          this.grid[x][y] = 1;
          this.game_stopped = false;
        }
      } 
    }

    return maxvalue;
  }

  max(depth = this.maxbotdepth) {
    if (this.checkGrid() != 1 || this.gridComplete() || depth <= 0) {
      return this.checkGrid();
    }
    var maxvalue = -1;
    
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          this.grid[x][y] = 2;
          var value = this.min(depth);
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

  getFreeFields() {
    var freeFields = 0;

    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          freeFields++;
        }
      } 
    }

    return freeFields;
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