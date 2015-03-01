QUnit.test("Perfect bowling score (300)", function( assert ) {
  var game = new Game();
  game.addPlayer("Omar");
  game.startGame();
  while (!game.finished())
    game.throwBall(10);
  assert.ok( game.score(0) == 300, "Passed!" );
});

QUnit.test("Always drop 5 pins", function( assert ) {
  var game = new Game();
  game.addPlayer("Omar");
  game.startGame();
  while (!game.finished())
    game.throwBall(5);
  assert.ok( game.score(0) == 150, "Passed!" );
});

QUnit.test("Always drop 1 pin", function( assert ) {
  var game = new Game();
  game.addPlayer("Omar");
  game.startGame();
  while (!game.finished())
    game.throwBall(1);
  assert.ok( game.score(0) == 20, "Passed!" );
});
