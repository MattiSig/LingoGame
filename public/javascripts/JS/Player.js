Lingo.Player = function (game, x, y) {
	this.playerFacing = 'right';
	Phaser.Sprite.call(this, game, x, y, 'rundog');
  this.anchor.set(0.5);

  //  Handy physics ref
  this.physics = game.physics.arcade;

  this.physics.enable(this);
  this.enableBody = true;
  this.body.tilePadding.set(32);
  this.body.collideWorldBounds = true;
  this.body.gravity.y = 700;

  this.animations.add('right',[0,1,2,3,4,5,6,7], 12, true);
  this.animations.add('left',[15,14,13,12,11,10,9,8], 12, true);
  this.animations.add('sit',[16,17,18,19,20], 12, true);

}
Lingo.Player.prototype = Object.create(Phaser.Sprite.prototype);
Lingo.Player.prototype.constructor = Lingo.Player;

Lingo.Player.prototype.update = function () {
	//this.body.x += 3;
}
Lingo.Player.prototype.moveRight = function(deltaTime) {
		this.body.x += (300 * deltaTime);
    this.animations.play('right');
    this.playerFacing = 'right';
}
Lingo.Player.prototype.moveLeft = function(deltaTime){
		this.body.x += (-300 * deltaTime);
    this.animations.play('left');
		this.playerFacing = 'left';
}
