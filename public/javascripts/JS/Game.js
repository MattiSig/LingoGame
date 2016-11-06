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
    
    this.layer = this.map.createLayer('base');
    this.layer2 = this.map.createLayer('background');
    this.layer.wrap = true;
    this.layer2.wrap = true;
    this.layer.resizeWorld();
    this.layer2.resizeWorld();
    
    this.map.setCollision([0,1,2,3,4,7,8,9,10,11,14,15,16],true, 'base');

    //------------------------------
    //-----------player-------------
    this.player = this.add.sprite(32, 32, 'player');
    this.physics.enable(player, Phaser.Physics.ARCADE);
    this.player.enableBody = true;
    this.player.physicsBodyType = Phaser.Physics.ARCADE;

    this.player.body.tilePadding.set(32);
    this.player.body.collideWorldBounds = true;

    this.camera.follow(player);
   	this.physics.arcade.gravity.y = 300;

	},
	update: function() {
		game.physics.arcade.collide(player, layer, function(s, t) {           }, null, this);

	}

};