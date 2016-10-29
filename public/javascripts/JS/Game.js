Lingo.Game = function(game) {
	this.map;
	this.layer;
	this.layer2;
	this.p;
	this.cursors;
	this.jumpButton;
	this.jumpTimer = 0;
	this.player;
	this.enemy;
	this.text1;
};

Lingo.Game.prototype = {
	create: function () {

		//game.stage.backgroundColor = '#0500FF';
    
    //------------------------
    //---------Level----------
    this.map = this.add.tilemap('tilemap');

    this.map.addTilesetImage('hell?', 'tiles');
    
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer2 = this.map.createLayer('drasl');
    this.layer.wrap = true;
    this.layer2.wrap = true;
    this.layer.resizeWorld();
    this.layer2.resizeWorld();
    
    this.map.setCollisionByExclusion([],true, 'Tile Layer 1');

	},
	update: function() {

	}

}