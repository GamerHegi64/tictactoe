class SingleGame extends Game {

  player = 2;
  bot = 0;

  beforeStart() {
    this.player = $('.player-box .custom-radio.box.checked').data('value');
    this.bot = 0;
    if (this.player == 0) {
      this.bot = 2;
    }
  }

  click (event) {
    if (this.game_stopped) {
      return;
    }
    var field = event.target.id;
    var x = parseInt(field[0]);
    var y = parseInt(field[1]);
  }

  minWo() {
    if (this.checkGrid() == 0) {
      return 0
    }
    minvalue = 999;
    
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          this.grid[x][y] = 0;
          value = this.max();
          if (value < minvalue) {
            minvalue = value;
            this.best
          }
          this.grid[x][y] = 1;
        }
      } 
    }

    return minvalue;
  }

  min() {
    if (this.checkGrid() == 0) {
      return 0
    }
    minvalue = 999;
    
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          this.grid[x][y] = 0;
          value = this.max();
          if (value < minvalue) {
            minvalue = value;
            this.best
          }
          this.grid[x][y] = 1;
        }
      } 
    }

    return minvalue;
  }

  maxWo() {

  }

  max() {
    if (this.checkGrid() == 2) {
      return 2
    }
    maxvalue = -999;
    
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (this.grid[x][y] == 1) {
          this.grid[x][y] = 2;
          value = this.min();
          if (value > maxvalue) {
            maxvalue = value;
          }
          this.grid[x][y] = 1;
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

  $('.field').click(function(event){
    game.click(event);
  });

  $('#btn-new-game').click(function(){
    game.beforeStart();
    game.start();
  });
});