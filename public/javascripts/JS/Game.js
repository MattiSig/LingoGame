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
    this.playerFacing = 'right';
	
    this.enemy;
	this.text1;
    this.game = game;
    this.button;
    
    this.pauseButton;
    this.deltaTime;
    
    this.script;
    this.showScript = false;
    this.tempScriptTime
};

Lingo.Game.prototype = {
    //create game objects to be renderd on screen
	create: function () {
    this.time.advancedTiming = true;
	
    this.stage.backgroundColor = '#989898';
    
    //------------------------
    //---------Level----------
    this.map = this.add.tilemap('tilemap');
    this.map.addTilesetImage('baseSet','tiles');
    
    this.layer2 = this.map.createLayer('background');
    this.layer3 = this.map.createLayer('bgMountains');
    console.log(this.layer2);
    this.layer = this.map.createLayer('base');
    this.layer.resizeWorld();

    //this.layer.debug = true;
    this.map.setCollision([1,2,3,4,5,8,9,10,11,12,15,16,17],true,'base');

    //-------Items
    this.script = this.add.group();
    this.script.enableBody = true;

    this.map.createFromObjects('scriptSpawn', 27, 'script', 0, true, false, this.script);
    //------------------------------
    //-----------player-------------
    this.player = this.add.sprite(250, 2800, 'rundog');
    //this.player.anchor.setTo(.5,.5);
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.enableBody = true;
    this.player.physicsBodyType = Phaser.Physics.ARCADE;

    this.player.body.tilePadding.set(32);
    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 700;
    this.player.body.setSize(70, 50, 4, 0);
    this.camera.follow(this.player);

    this.player.animations.add('right',[0,1,2,3,4,5,6,7], 12, true);
    this.player.animations.add('left',[15,14,13,12,11,10,9,8], 12, true);
    this.player.animations.add('sit',[16,17,18,19,20], 12, true);
    //------------------------------
    //-----------Enemy--------------
    this.enemy = this.add.sprite(2325, 2700, 'ms');
    this.enemy.animations.add('walk');
    this.enemy.animations.play('walk', 50, true);

    this.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    this.enemy.enableBody = true;
    this.enemy.physicsBodyType = Phaser.Physics.ARCADE;
    //this.enemy.body.setSize(4, 4, 14, 26);
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
    this.pauseButton = this.input.keyboard.addKey(Phaser.Keyboard.P);
    console.log(this.pauseButton);
	},
    //game update loop
	update: function() {

        this.deltaTime = this.time.elapsedMS / 1000;
		
        this.player.body.velocity.x = 0;
        //stick text to enemy
        this.text1.x = this.enemy.body.x ;
        this.text1.y = this.enemy.body.y - 40;
        //handle controler events
        if (this.cursors.left.isDown){
            this.player.body.x = this.player.body.x + (-150 * this.deltaTime);
            this.player.animations.play('left');
            this.playerFacing = 'left';

        }else if (this.cursors.right.isDown){
            this.player.body.x = this.player.body.x + 150 * this.deltaTime;
            this.player.animations.play('right');
            this.playerFacing = 'right';
        
        }else{
            if (this.playerFacing != 'idle'){
                this.player.animations.stop();
                if (this.playerFacing == 'left'){
                    this.player.frame = 21;
                }else{
                    this.player.frame = 16;
                    
                }
                this.playerFacing = 'idle';
            }
        }
    
        
        this.physics.arcade.collide(this.player, this.layer);

        if (this.jumpButton.isDown && this.player.body.onFloor() && this.time.now > this.jumpTimer)
        {
            this.player.body.velocity.y = -500;
            this.jumpTimer = this.time.now + 750;
        }
        if (this.showScript)
        
        this.physics.arcade.collide(this.enemy, this.layer);
        this.physics.arcade.collide(this.enemy,this.player,function(player, enemy) {
            this.player.kill();
            this.physics.arcade.isPaused = (this.physics.arcade.isPaused) ? false : true;
        },null, this);
        this.physics.arcade.overlap(this.player, this.script, this.collectScript, null, this);

        this.pauseButton.onDown.add(this.pause, this);        

	},
    //render debug text
    render: function(){
        this.game.debug.bodyInfo(this.player, 32, 32);
        //this.game.debug.body(this.player);
        this.game.debug.text("FPS: " + this.game.time.fps, 2, 14,"#00ff00");
        this.game.debug.text("ms.time: " +  this.deltaTime, 2, 42, "#00ff00" );
        this.game.debug.text(this.game.time.now, 2, 70, "#00ff00");
        this.game.debug.text(this.jumpTimer, 2, 85, "#00ff00");
    },
    pause: function(){
        this.physics.arcade.isPaused = (this.physics.arcade.isPaused) ? false : true;

    },
    collectScript: function(player, script) {
        script.destroy();
        this.tempScriptTime = this.time.now + 3000;
        this.showScript = true;
    },
    displayScript: function(){

    }

};