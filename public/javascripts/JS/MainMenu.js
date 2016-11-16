Lingo.MainMenu = function(game) {
	this.button;
	this.message;
};

Lingo.MainMenu.prototype = {

	create: function() {
		this.stage.backgroundColor = '#989898';
		this.button =  this.add.button(this.world.centerX, 400, 'button', this.clickNewGame, this, 2, 1, 0);
		this.button.onInputOver.add(this.over, this);
    this.button.onInputOut.add(this.out, this);
		this.button.anchor.setTo(0.5,0.5);	
		this.message = this.add.text(this.world.centerX, 350, "Press button below to play", { font: "14px Arial Black", fill: "#FFFFFF" });
    this.message.anchor.setTo(0.5, 0.5);
	},
	clickNewGame: function() {
		this.state.start('Game');
	},
	over: function() {
    console.log('button over');
	},
	out: function() {
    console.log('button out');
	}
};