class TwoGame extends Game {

}

game_div = document.getElementById('game');
fields = game_div.childNodes;
game = new TwoGame(game_div);

game.start();

fields.forEach(field => {
  field.addEventListener('click', function (event) {
    game.click(event);
  });
});
 