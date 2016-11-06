Lingo.Game = function(game) {
	this.map;
	this.layer;
	this.layer2;
    this.layer3;
	this.p;
	this.cursors;
	this.jumpButton;
	this.jumpTimer = 0;
	this.player;
	this.enemy;
	this.text1;
    this.game = game;
};

Lingo.Game.prototype = {
	create: function () {

	//game.stage.backgroundColor = '#0500FF';
    
    //------------------------
    //---------Level----------
    this.map = this.add.tilemap('tilemap');
    this.map.addTilesetImage('baseSet','tiles');
    this.map.setCollision([0,1,2,3,4,7,8,9,10,11]);

    
    this.layer2 = this.map.createLayer('background');
    this.layer3 = this.map.createLayer('bgMountains');
    this.layer = this.map.createLayer('base');
    console.log(this.layer3);
    this.layer3.y = -16;
    this.layer.resizeWorld();
    this.layer2.resizeWorld();
    this.layer3.resizeWorld();

    this.map.setCollision([1,2,3,4,5,8,9,10,11,12,15,16,17],true,'base');
    //this.layer.debug = true;
    //------------------------------
    //-----------player-------------
    this.player = this.add.sprite(250, 2800, 'player');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.enableBody = true;
    this.player.physicsBodyType = Phaser.Physics.ARCADE;

    this.player.body.setSize(4, 4, 14, 14);
    this.player.body.tilePadding.set(32);
    this.player.body.collideWorldBounds = true;

    this.camera.follow(this.player);
   	this.physics.arcade.gravity.y = 300;
    console.log(this.player.body);
    this.player.debyg = true;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},
	update: function() {
		this.physics.arcade.collide(this.player, this.layer);

        this.player.body.velocity.x = 0;
    
        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -250;

        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = 250;
        }
        
        if (this.jumpButton.isDown && this.player.body.onFloor() && this.time.now > this.jumpTimer)
        {
            this.player.body.velocity.y = -300;
            this.jumpTimer = this.time.now + 750;
        }
	},
    render: function(){
        this.game.debug.bodyInfo(this.player, 32, 32);
        this.game.debug.body(this.player);
    }

};