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
        done = true;
      else
        this._frame.left = 10;
    }
  }
  else if (this._frame.rolls.length == 2) { 
    // Seconds roll
    if ((this._frame.frame < 9) || (this._frame.left > 0 && this._frame.rolls[0] < 10))
      done = true;
    else if (this._frame.left == 0)
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

Game.prototype.score = function(playerIndex) {
  var sum = 0;
  var frames = this._scores[playerIndex];

  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    for (var j = 0; j < frame.rolls.length; j++) {
      sum += frame.rolls[j];
    }
    if (frame.left == 0) {
      if (frame.rolls.length == 1) {
        // Strike
        if (frames[i + 1])
          if (frames[i + 1].rolls.length == 1) {
            sum += frames[i + 1].rolls[0] || 0;
            if (frames[i + 2]) {
              sum += frames[i + 2].rolls[0] || 0;
            }
          } else if (frames[i + 1].rolls.length > 1) {
            sum += frames[i + 1].rolls[0] + frames[i + 1].rolls[1];
          }
      } else if (frame.rolls.length == 2) {
        // Spare
        if (frames[i + 1])
          sum += frames[i + 1].rolls[0] || 0;
      }
    }
  }
  return sum;
}

Game.prototype.addPlayer = function(playerName) {
  this._players.push(playerName);
}
