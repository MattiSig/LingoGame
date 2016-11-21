//game is a new state of Phaser.game. Takes Phaser.game as input
//creates "private" variables to be called privately within 
//game.prototype object
Lingo.Level2 = function(game) {
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
    this.text2;
    this.game = game;
    this.button;
    
    this.pauseButton;
    this.deltaTime;
    
    this.script;
    this.showScript = false;
    this.tempScriptTime =0;
    //8===========================D
    this.button1;
    this.button2;
    this.button3;
    this.button4;

    this.aButton;
    this.sButton;
    this.dButton;
    this.fButton;
    //8==============================D

};
//8===========================D
var dictionary;
var textNumber = 0;
var isWithinRange;
//8===========================D

Lingo.Level2.prototype = {
    //create level2 objects to be renderd on screen
	create: function () {

    this.time.advancedTiming = true;
	
    this.stage.backgroundColor = '#989898';
    
    //------------------------
    //---------Level----------
    this.map = this.add.tilemap('tilemap');
    this.map.addTilesetImage('baseSet','tiles');
    
    this.layer2 = this.map.createLayer('background');
    this.layer3 = this.map.createLayer('bgMountains');
    this.layer = this.map.createLayer('base');
    this.layer.resizeWorld();

    //this.layer.debug = true;
    this.map.setCollision([1,2,3,4,5,8,9,10,11,12,15,16,17],true,'base');

    //-------Items(scripts)--------
    this.script = this.add.group();
    this.script.enableBody = true;

    this.map.createFromObjects('scriptSpawn', 27, 'script', 0, true, false, this.script);
    //------------------------------
    //-----------player-------------
    this.player = this.add.sprite(250, 2800, 'rundog');
    //this.player.anchor.setTo(.5,.5);
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.enableBody = true;
    //this.player.physicsBodyType = Phaser.Physics.ARCADE;

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
    //this.enemy.physicsBodyType = Phaser.Physics.ARCADE;
    //this.enemy.body.setSize(4, 4, 14, 26);
    this.enemy.body.tilePadding.set(32);
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.velocity.x = 50;
    this.enemy.body.bounce.x = 1;
    this.enemy.body.gravity.y = 700;
    this.enemy.anchor.setTo(.5,.5);
    this.enemy.scale.setTo(-1,1);
    //8==========================================D
    $.ajax({
        type: 'GET',
        url: '/getword',
        async: false,
        success: function(data){
            setDictionary(data);
            //Sækir 4 orð, til að sækja fleir þarf að breyta fjölda
            //í sql-dictionary
        }
    });

    function setDictionary(data){
        dictionary = data;
    }

    function setArray(){
        var array = [];
        var length = dictionary.length;
        for(let i = 0; i < length; i++){
            array[i] = dictionary[i].islenska;
        }
        return array;
    }

    function shuffleWords(array){
        for(let i = array.length; i; i--){
            let j = Math.floor(Math.random()*i);
            [array[i-1], array[j]] = [array[j], array[i-1]];
        }
    }

    var wordArray = setArray();
    shuffleWords(wordArray);
    console.log(wordArray);
    this.button1 = new Lingo.Button(this.game, 0, 550, wordArray[0]);
    this.add.existing(this.button1);
    this.button1.alpha = 0;
    this.button2 = new Lingo.Button(this.game, 200, 550, wordArray[1]);
    this.add.existing(this.button2);
    this.button2.alpha = 0;
    this.button3 = new Lingo.Button(this.game, 400, 550, wordArray[2]);
    this.add.existing(this.button3);
    this.button3.alpha = 0;
    this.button4 = new Lingo.Button(this.game, 600, 550, wordArray[3]);
    this.add.existing(this.button4);
    this.button4.alpha = 0;
    //8==============================================================D

    //------------------------------
    //-----------text-------------
    this.text1 = this.add.text(this.enemy.body.x, this.enemy.body.y, dictionary[0].enska, { font: "14px Arial Black", fill: "#FFFFFF" });
    this.text1.anchor.setTo(0.5, 0.5);

    this.text2 = this.add.text(700, 2700,dictionary[textNumber].enska+" = "+dictionary[textNumber].islenska,{ font: "18px Arial Black", fill: "#FFFFFF" });
    this.text2.alpha = 0;

    //------------------------------
    //-----------controls-------------
    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.pauseButton = this.input.keyboard.addKey(Phaser.Keyboard.P);
    //8===============================================================D
    this.aButton = this.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sButton = this.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dButton = this.input.keyboard.addKey(Phaser.Keyboard.D);
    this.fButton = this.input.keyboard.addKey(Phaser.Keyboard.F);
    //8===============================================================D
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
            this.player.body.x = this.player.body.x + (-300 * this.deltaTime);
            this.player.animations.play('left');
            this.playerFacing = 'left';

        }else if (this.cursors.right.isDown){
            this.player.body.x = this.player.body.x + 300 * this.deltaTime;
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
            this.player.body.velocity.y = -750;
            this.jumpTimer = this.time.now + 750;
            this.player.frame = 5;
        }
        if((this.time.now > this.tempScriptTime) && this.text2.alpha){
            this.hideScript();
        }

        isWithinRange = (
            (this.player.body.x > this.enemy.body.x - 400) && 
            (this.player.body.x < this.enemy.body.x + 200) && 
            (this.player.body.y < this.enemy.body.y +500) && 
            (this.player.body.y > this.enemy.body.y - 500)
        )
        if(isWithinRange && (this.button1.alpha === 0)){
            this.makeVisible(true);
            console.log('true')
        }else if(!isWithinRange && (this.button1.alpha === 1)) {
            this.makeVisible(false);
            console.log('false');
        }
        
        this.physics.arcade.collide(this.enemy, this.layer);
        this.physics.arcade.collide(this.enemy,this.player,function(player, enemy) {
            this.player.kill();
            this.physics.arcade.isPaused = (this.physics.arcade.isPaused) ? false : true;
        },null, this);
        this.physics.arcade.overlap(this.player, this.script, this.collectScript, null, this);

        this.pauseButton.onDown.add(this.pause, this);        
        //8====================================D
        this.aButton.onDown.add(this.isCorrect, this.button1);
        this.sButton.onDown.add(this.isCorrect, this.button2);
        this.dButton.onDown.add(this.isCorrect, this.button3);
        this.fButton.onDown.add(this.isCorrect, this.button4);

        /*if (this.enemy.body.blocked.left === true || this.enemy.body.blocked.right === true) {

        }*/
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
    makeVisible: function(isHidden){
        if(isHidden){
            this.button1.alpha = 1;
            this.button2.alpha = 1;
            this.button3.alpha = 1;
            this.button4.alpha = 1;
        } else{
            console.log('asdf');
            this.button1.alpha = 0;
            this.button2.alpha = 0;
            this.button3.alpha = 0;
            this.button4.alpha = 0;
        }
    },
    isCorrect: function(){
        console.log(this);
        var buttonText = this.buttonText._text;
        if(buttonText===dictionary[0].islenska){
            console.log('réttur takki');
        } else{
            console.log('vitlaus takki');
        }
    },
    collectScript: function(player, script) {
        script.destroy();
        this.text2 = this.add.text(700, 2700, 'level 2 stuff',{ font: "18px Arial Black", fill: "#FFFFFF" });
        this.tempScriptTime = this.time.now + 3000;
        this.text2.x = script.x -100;
        this.text2.y = script.y -200;
        this.text2.alpha = 1;
        textNumber++;
        console.log(this.text2);
    },
    hideScript: function(){
        this.text2.alpha = 0;
    }

};