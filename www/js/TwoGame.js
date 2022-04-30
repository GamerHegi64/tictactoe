class TwoGame extends Game {

}

game_div = document.getElementById('game');
fields = game_div.childNodes;
game = new TwoGame(game_div);

fields.forEach(field => {
  field.addEventListener('click', game.click(event));
});
