//game is a new state of Phaser.game. Takes Phaser.game as input
//creates "private" variables to be called privately within 
//game.prototype object
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
    this.button;
};

Lingo.Game.prototype = {
    //create game objects to be renderd on screen
	create: function () {

	this.stage.backgroundColor = '#989898';
    
    //------------------------
    //---------Level----------
    this.map = this.add.tilemap('tilemap');
    this.map.addTilesetImage('baseSet','tiles');
    this.map.setCollision([0,1,2,3,4,7,8,9,10,11]);

    
    this.layer2 = this.map.createLayer('background');
    this.layer3 = this.map.createLayer('bgMountains');
    this.layer = this.map.createLayer('base');
    this.layer.resizeWorld();
    this.layer2.resizeWorld();
    this.layer3.resizeWorld();

    this.map.setCollision([1,2,3,4,5,8,9,10,11,12,15,16,17],true,'base');

    //------------------------------
    //-----------player-------------
    this.player = this.add.sprite(250, 2800, 'player');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.enableBody = true;
    this.player.physicsBodyType = Phaser.Physics.ARCADE;

    this.player.body.setSize(4, 4, 14, 46);
    this.player.body.tilePadding.set(32);
    this.player.body.collideWorldBounds = true;

    this.camera.follow(this.player);
   	this.physics.arcade.gravity.y = 700;
    console.log(this.player.body);
    //------------------------------
    //-----------Enemy--------------
    this.enemy = this.add.sprite(2325, 2700, 'ms');
    this.enemy.animations.add('walk');
    this.enemy.animations.play('walk', 50, true);

    this.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    this.enemy.enableBody = true;
    this.enemy.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemy.body.setSize(4, 4, 14, 26);
    this.enemy.body.tilePadding.set(32);
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.velocity.x = 50;
    this.enemy.body.bounce.x = 1;
    //------------------------------
    //-----------text-------------
    this.text1 = this.add.text(this.enemy.body.x, this.enemy.body.y, "afturganga", { font: "14px Arial Black", fill: "#FFFFFF" });
    this.text1.anchor.setTo(0.5, 0.5);


    //------------------------------
    //-----------controls-------------
    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},
    //game update loop
	update: function() {
        //handle collitions
		this.physics.arcade.collide(this.player, this.layer);
        this.physics.arcade.collide(this.enemy, this.layer);
        this.physics.arcade.collide(this.enemy,this.player,function(s, t) {
            this.player.kill();
            this.physics.arcade.isPaused = (this.physics.arcade.isPaused) ? false : true;
        });
        this.player.body.velocity.x = 0;
        //stick text to enemy
        this.text1.x = this.enemy.body.x ;
        this.text1.y = this.enemy.body.y - 40;
        //handle controler events
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
            this.player.body.velocity.y = -500;
            this.jumpTimer = this.time.now + 750;
        }
	},
    //render debug text
    render: function(){
        this.game.debug.bodyInfo(this.player, 32, 32);
        this.game.debug.body(this.player);
    }

};