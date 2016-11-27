'use strict'
Lingo.Button = function(game, posX, posY, text){
	Phaser.Sprite.call(this, game, posX, posY, 'button');

	this.buttonText = this.game.add.text(100, 25, text, {font: "16px Comic Sans", fill: "#000000"});
	this.buttonText.anchor.setTo(0.5, 0.5);
	this.addChild(this.buttonText);
	this.fixedToCamera = true;
};

Lingo.Button.prototype = Object.create(Phaser.Sprite.prototype);
Lingo.Button.prototype.constructor = Lingo.Button;
Lingo.Button.prototype.setText = function(text){
	this.buttonText.setText(text);
}