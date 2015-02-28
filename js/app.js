function element(id) {
  return document.getElementById(id);
}

function Game() {
  this.players = [];
}

game = new Game();

function addPlayer(playerName) {
  playerName = playerName.trim();
  if (playerName.length == 0) return;
  game.players.push(playerName);
  element('player_name').value = ''; // Reset the input.
  var li = document.createElement('LI');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(playerName));
  element('players_list').appendChild(li);
  element('start_game').removeAttribute('disabled');
}

function startGame() {
  element('board').style.display = '';
  element('players').style.display = 'none';
  for(i = 0; i < game.players.length; i++) {
    var player = game.players[i];
    var row = document.createElement('TR');
    var td = document.createElement('TD'); td.appendChild(document.createTextNode(player));
    row.appendChild(td);
    element('scores').appendChild(row);

  }
}

// Document load script
(function() {

  element('add_player_form').addEventListener('submit', function(ev) {
    ev.preventDefault();
    var playerName = element('player_name').value;
    addPlayer(playerName);
  });

  element('add_random_players').addEventListener('click', function(ev) {
    addPlayer('Omar');
    addPlayer('Johannes');
    addPlayer('Jwana');
    addPlayer('Anna');
  });

  element('start_game').addEventListener('click', function(ev) {
    startGame();
  });

})();
