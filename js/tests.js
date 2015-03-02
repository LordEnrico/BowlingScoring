QUnit.test("Perfect bowling score (300)", function( assert ) {
  var game = new Game();
  game.addPlayer("Omar");
  game.startGame();
  while (!game.finished())
    game.throwBall(10);
  assert.ok(game.score(0) == 300, "Passed!" );
});

QUnit.test("Always drop 5 pins", function( assert ) {
  var game = new Game();
  game.addPlayer("Omar");
  game.startGame();
  while (!game.finished())
    game.throwBall(5);
  assert.ok(game.score(0) == 150, "Passed!" );
});

QUnit.test("Always drop 1 pin", function( assert ) {
  var game = new Game();
  game.addPlayer("Omar");
  game.startGame();
  while (!game.finished())
    game.throwBall(1);
  assert.ok(game.score(0) == 20, "Passed!" );
});

QUnit.test("Last frame, strike, then you get two extra shots", function( assert ) {
  var game = new Game();
  game.addPlayer("Omar");
  game.startGame();
  var i = 2 * 9;
  while (i-- > 0)
    game.throwBall(1);
  game.throwBall(10);
  game.throwBall(1);
  assert.ok(game.pinsLeft() == 9, "Passed!" );
  game.throwBall(1);
  assert.ok(game.score(0) == (18 + 12), "Passed!" );
});

QUnit.test("Last frame, spare you get extra shot", function( assert ) {
  var game = new Game();
  game.addPlayer("Omar");
  game.startGame();
  var i = 2 * 9;
  while (i-- > 0)
    game.throwBall(1);
  game.throwBall(5);
  game.throwBall(5);
  assert.ok(game.pinsLeft() == 10, "Passed!" );
  assert.ok(game.finished() == false, "Passed!" );
  game.throwBall(1);
  assert.ok(game.finished() == true, "Passed!" );
  assert.ok(game.score(0) == (18 + 11), "Passed!" );
});
