class TwoGame extends Game {

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

 