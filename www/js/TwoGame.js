class TwoGame extends Game {
  click(event) {
    if (this.game_stopped) {
      return;
    }

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
    this.ceckWinner(this.checkGrid());
  }
}

$(document).ready(function(){
  modal = new Modal();
  game = new TwoGame(modal);
  game.start();

  $('.field').click(function(event){
    game.click(event);
  });

  $('#btn-new-game').click(function(){
    game.start();
  });
});

 