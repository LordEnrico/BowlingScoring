function Game() {
  this.players = [];
}

Game.prototype.renderPlayers = function() {
  $('#players_list ul li').remove();
  if (this.players.length == 0) {
    $('#players_list .alert').removeClass('hidden');
  } else {
    $('#players_list .alert').addClass('hidden');
    for (i = 0; i < this.players.length; i++) {
      var player_name = this.players[i];
      var li = $('<li>', { 'class': 'list-group-item', 'id': 'player-' + i.toString() });
      li.text(player_name);
      $('#players_list ul').append(li);
      var delete_button = $('<a>', { href: '#', 'class': 'badge delete-player', 'data-player-id': i });
      delete_button.text('X');
      li.append(delete_button);
    }
  }
};

game = new Game();

function addPlayer(playerName) {
  playerName = playerName.trim();
  if (playerName.length > 0) {
    game.players.push(playerName);
    game.renderPlayers();
    $('#player_name').val('');
  }
}

// Document load script
$(function() {
  $('#add_player_form').submit(function(ev) {
    ev.preventDefault();
    var playerName = $('#player_name').val();
    addPlayer(playerName);
  });

  $('#add_random_players').on('click', function(ev) {
    addPlayer('Omar');
    addPlayer('Johannes');
    addPlayer('Jwana');
    addPlayer('Anna');
  });

  // Game render players on game beginning
  game.renderPlayers();

  // Deleting player
  $('#players_list').on('click', 'a.delete-player', function(ev) {
    var player_id = $(ev.target).data('player-id');
    console.log(player_id);
    game.players.splice(player_id, 1);
    game.renderPlayers();
  });
});
