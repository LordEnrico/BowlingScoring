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
      var delete_button = $('<a>', { href: '#', 'class': 'delete-player' });

    }
  }
};

game = new Game();

// Document load script
$(function() {
  $('#add-player-form').submit(function(ev) {
    ev.preventDefault();
    var playerName = $('#player_name').val();
    playerName = playerName.trim();
    if (playerName.length > 0) {
      game.players.push(playerName);
      game.renderPlayers();
      $('#player_name').val('');
    }
  });

  // Game render players on game beginning
  game.renderPlayers();
});
