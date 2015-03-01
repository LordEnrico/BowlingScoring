function element(id) {
  return document.getElementById(id);
}

function Game() {
  this._players = [];
  this._currentFrame = 0;
  this._scores = []; // Array of Arrays.
  this._finished = false;
}

Game.prototype.players = function() {
  return this._players;
}

Game.prototype.startGame = function() {
  this._currentPlayer = null; // Current player index (play who is playing now)
  for (var i = 0; i < this._players.length; i++) {
    this._scores.push([]);
  }
  this.newFrame(); // Current frame
}

Game.prototype.newFrame = function() {
  console.log("New frame");
  if (this._currentPlayer != null)
    this._currentPlayer += 1;
  else
    this._currentPlayer = 0;

  this._frame = null;
  if (this._currentPlayer == this._players.length) {
    if (this._currentFrame == 9)
      this._finished = true;
    else {
      this._currentFrame += 1;
      this._currentPlayer = 0;
    }
  }
  if (!this._finished) {
    this._frame = { rolls: [], left: 10, frame: this._currentFrame, player: this._currentPlayer };
    this._scores[this._currentPlayer].push(this._frame);
  }
}

Game.prototype.finished = function(pins) {
  return this._finished;
}

Game.prototype.pinsLeft = function() {
  return this._frame.left;
}

Game.prototype.currentPlayer = function() {
  return this._currentPlayer;
}

// pins: pins to be dropped
// returns the frame
Game.prototype.throwBall = function(pins) {
  if (this.finished()) return null;
  if (pins > this._frame.left) return null;
  this._frame.left -= pins;
  var done = false;
  this._frame.rolls.push(pins);
  if (this._frame.rolls.length == 1) { 
    // First roll
    if (this._frame.left == 0) {
      if (this._frame.frame < 9)
        done = true; // Fix for the 10th frame
      else
        this._frame.left = 10;
    }
  }
  else if (this._frame.rolls.length == 2) { 
    // Seconds roll
    if (this._frame.frame < 9)
      done = true; // Fix for the 10th frame
    else
      this._frame.left = 10;
  } else {
    done = true;
  }
  if (done) {
    var returnFrame = this._frame;
    this.newFrame();
    return returnFrame;
  } else {
    return this._frame;
  }
}

Game.prototype.leftPins = function() {
  return this.frame.left;
}

Game.prototype.score = function(playerIndex) {
  sum = 0;
  var strike = false;
  var spare = false;
  for (var i = 0; i < this._scores[playerIndex].length; i++) {
    var frame = this._scores[playerIndex][i];
    for (var j = 0; j < frame.rolls.length; j++) { 
      var roll = frame.rolls[j];
      sum += roll;
      if (spare) { sum += roll; spare = false; }
      if (strike) { sum += roll; strike = false; spare = true; }

      if (frame.frame < 9) {
        if (frame.left == 0 && frame.rolls.length == 1) {
          strike = true;
        } else if (frame.left == 0 && frame.rolls.length == 2 ) {
          spare = true
        }
      }
    }
  }
  return sum;
}

Game.prototype.addPlayer = function(playerName) {
  this._players.push(playerName);
}

game = new Game();

function addPlayer(playerName) {
  playerName = playerName.trim();
  if (playerName.length == 0) return;
  game.addPlayer(playerName);
  element('player_name').value = ''; // Reset the input.
  var li = document.createElement('LI');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(playerName));
  element('players_list').appendChild(li);
  element('start_game').removeAttribute('disabled');
}

function startGame() {
  game.startGame();
  element('board').style.display = '';
  element('players').style.display = 'none';
  this.scoreViews = [];
  this.totalViews = [];
  for(i = 0; i < this.game.players().length; i++) {
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
}

function rollLabel(score, left, zero_left_label) {
  if (left == 0) return zero_left_label;
  else if (score == 0) return '-';
  else if (score < 10) return score.toString();
}

function renderFrame(frame) {
  var viewNode = this.scoreViews[frame.player][frame.frame];
  var text = '';
  if (frame.rolls.length == 1) {
    text = this.rollLabel(frame.rolls[0], frame.left, 'X');
    if (frame.left == 0) text += " -";
  } else if (frame.rolls.length == 2) {
    text = this.rollLabel(frame.rolls[0], 10 - frame.rolls[0]) + ' ' + this.rollLabel(frame.rolls[1], frame.left, '/');
  }
  viewNode.nodeValue = text;
}

function throwBall() {
  if (game.finished()) return;
  console.log("Throwing the ball");
  var pins = Math.floor(Math.random() * (game.pinsLeft() + 1));
  var frame = game.throwBall(pins);
  if (frame) {
    this.renderFrame(frame);
    this.totalViews[frame.player].nodeValue = game.score(frame.player);
    if (game.finished()) element('throw_ball').setAttribute('disabled', 'disabled');
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

  element('throw_ball').addEventListener('click', function(ev) {
    throwBall();
  });

  // TEMP
  addPlayer("Omar");
  addPlayer("Harran");
  startGame();

  testGame = new Game();
  testGame.addPlayer('omar');
  testGame.startGame();
  while (!testGame.finished()) {
    testGame.throwBall(10);
  }
  console.log(testGame.score(0));
  

})();
