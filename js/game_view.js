function GameView() {

  element('add_player_form').addEventListener('submit', function(ev) {
    ev.preventDefault();
    var playerName = element('player_name').value;
    this.addPlayer(playerName);
  }.bind(this));

  element('add_random_players').addEventListener('click', function(ev) {
    this.addPlayer('Omar');
    this.addPlayer('Johannes');
    this.addPlayer('Jwana');
    this.addPlayer('Anna');
  }.bind(this));

  element('start_game').addEventListener('click', function(ev) {
    this.startGame();
    this.highlightCurrentPlayer();
  }.bind(this));

  element('throw_ball').addEventListener('click', function(ev) {
    this.throwBall();
  }.bind(this));

  element('throw_ball_until_end').addEventListener('click', function(ev) {
    while (!this.game.finished())
      this.throwBall();
  }.bind(this));

  this.game = new Game();
}

GameView.prototype.addPlayer = function(playerName) {
  playerName = playerName.trim();
  if (playerName.length == 0) return;
  this.game.addPlayer(playerName);
  element('player_name').value = ''; // Reset the input.
  var li = document.createElement('LI');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(playerName));
  element('players_list').appendChild(li);
  element('start_game').removeAttribute('disabled');
};

GameView.prototype.startGame = function() {
  this.game.startGame();
  element('board').style.display = '';
  element('players').style.display = 'none';
  this.scoreViews = [];
  this.totalViews = [];
  for(var i = 0; i < this.game.players().length; i++) {
    var scoreViewsArray = [];
    this.scoreViews.push(scoreViewsArray);
    var player = this.game.players()[i];
    var row = document.createElement('TR');
    var td = document.createElement('TD'); td.appendChild(document.createTextNode(player));
    row.appendChild(td);
    for (var j = 0; j < 10; j++) {
      var textNode = document.createTextNode('');
      var td = document.createElement('TD'); td.appendChild(textNode);
      row.appendChild(td);
      scoreViewsArray.push(textNode);
    }
    var totalNode = document.createTextNode(this.game.score(i));
    this.totalViews.push(totalNode);
    var td = document.createElement('TD'); td.appendChild(totalNode);
    row.appendChild(td);
    element('scores').appendChild(row);
  }
};

GameView.prototype.renderFrame = function(frame) {
  var viewNode = this.scoreViews[frame.player][frame.frame];
  var text = frame.rolls.join(" | ");
  viewNode.nodeValue = text;
};

GameView.prototype.throwBall = function() {
  if (this.game.finished()) return;
  var pins = Math.floor((Math.random() * this.game.pinsLeft()) + 1); // According to the requirements, it should drop 1 - 10 pins. So zero is not possible
  var frame = this.game.throwBall(pins);
  if (frame) {
    this.renderFrame(frame);
    this.totalViews[frame.player].nodeValue = this.game.score(frame.player);
    if (this.game.finished()) element('throw_ball').setAttribute('disabled', 'disabled');
  }
  this.highlightCurrentPlayer();
};

GameView.prototype.highlightCurrentPlayer = function() {
  var table = element('scores_table');
  var rows = table.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {
    rows[i].className = '';
  }
  if (this.game.finished()) return;
  rows[this.game.currentPlayer() + 1].className = 'success';
};
