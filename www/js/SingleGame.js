class SingleGame extends Game {

  player = 1;

  start() {
    
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