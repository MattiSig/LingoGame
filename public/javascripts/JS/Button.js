Lingo.Button = function(game, posX, posY, text, buttonType, isFixed){
	Phaser.Sprite.call(this, game, posX, posY, buttonType);

	this.buttonText = this.game.add.text(100, 25, text, {font: "16px Comic Sans", fill: "#000000"});
	this.buttonText.anchor.setTo(0.5, 0.5);
	this.addChild(this.buttonText);
	this.fixedToCamera = isFixed;
};

Lingo.Button.prototype = Object.create(Phaser.Sprite.prototype);
Lingo.Button.prototype.constructor = Lingo.Button;