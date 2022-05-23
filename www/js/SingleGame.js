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

  min() {

  }

  max() {

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