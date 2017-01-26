'use strict'
//Level1 is a new state of Phaser.game. Takes Phaser.game as input
//creates "private" variables to be called privately within this
//game.prototype object
Lingo.Level1 = function(game) {
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
    this.lifeTimer= 0;
	
    this.enemy;
	this.text1;
    this.text2;
    this.game = game;
    this.button;
    this.door;
    
    this.pauseButton;
    this.deltaTime;
    
    this.script;
    this.showScript = false;
    this.tempScriptTime =0;

    this.button1;
    this.button2;
    this.button3;
    this.button4;

    this.aButton;
    this.sButton;
    this.dButton;
    this.fButton;

    this.wordArray = [[],[],[]];
    this.buttonInRange;
};
//some global variables that needed to be used trough states
var dictionary;
var textNumber = 0;
var isWithinRange = new Array();
var myEnemyText;

Lingo.Level1.prototype = {
    //create game objects to be renderd on screen
	create: function () {
 
    textNumber = 0;
    this.time.advancedTiming = true;
	
    this.stage.backgroundColor = '#526ec4';
    
    //------------------------
    //---------Level----------
    this.map = this.add.tilemap('level1');
    this.map.addTilesetImage('baseSet','tiles');
    
    this.layer2 = this.map.createLayer('background');
    this.layer3 = this.map.createLayer('bgMountains');
    this.layer = this.map.createLayer('base');
    this.layer.resizeWorld();

    //this.layer3.debug = true;
    this.map.setCollision([1,2,3,4,5,8,9,10,11,12,15,16,17],true,'base');
    this.map.setCollision([37, 38, 39],true,'bgMountains');
    //-------Items(scripts)--------
    this.script = this.add.group();
    this.script.enableBody = true;

    this.door = this.add.group();
    this.door.enableBody=true;

    this.map.createFromObjects('objectsSpawn', 27, 'script', 0, true, false, this.script);
    this.map.createFromObjects('objectsSpawn', 7, 'items', 41, true, false, this.door);
    //------------------------------
    //-----------player-------------
    this.player = new Lingo.Player(this.game, 231, 2800);
    this.add.existing(this.player);
    this.add.existing(this.player.tounges1);
    this.add.existing(this.player.tounges2);
    this.camera.follow(this.player);

    //------------------------------
    //-----------Enemy--------------
    this.enemy = this.add.group();
    this.enemy.enableBody = true;
    this.map.createFromObjects('objectsSpawn', 35, 'ms', 0, true, false, this.enemy);

    this.enemy.callAll('animations.add', 'animations', 'walk', [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18], 17, true);
    this.enemy.callAll('animations.play', 'animations', 'walk');

    this.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    
    //loop throught group
    for (var i = 0; i < this.enemy.children.length; i++)
        {
            var aEnemy = this.enemy.children[i];
            aEnemy.body.velocity.x = 50;
            aEnemy.body.bounce.x = 1;
            aEnemy.body.gravity.y = 100;
            aEnemy.anchor.setTo(.5,.5);
            isWithinRange[i] = false;
        }
    //Fetches 12 words form
    //sql-dictionary.js
    $.ajax({
        type: 'GET',
        url: '/getword',
        async: false,
        success: function(data){
            setDictionary(data);
        }
    });
    //helper
    function setDictionary(data){
        dictionary = data;
    }

    //3 word arrays initialized one for each enemy
    this.wordArray[0] = this.setArray(0);
    this.wordArray[1] = this.setArray(4);
    this.wordArray[2] = this.setArray(8);

    //Creates buttons and sets alpha to zero which does not render them
    this.button1 = new Lingo.Button(this.game, 0, 550, "");
    this.add.existing(this.button1);
    this.button1.alpha = 0;
    this.button2 = new Lingo.Button(this.game, 200, 550, "");
    this.add.existing(this.button2);
    this.button2.alpha = 0;
    this.button3 = new Lingo.Button(this.game, 400, 550, "");
    this.add.existing(this.button3);
    this.button3.alpha = 0;
    this.button4 = new Lingo.Button(this.game, 600, 550, "");
    this.add.existing(this.button4);
    this.button4.alpha = 0;

    //------------------------------
    //-----------text-------------
    this.text1 = this.add.group();
    for(var i = 0; i < this.enemy.children.length; i++){
        this.text1.add(this.add.text(this.enemy.children[i].body.x, this.enemy.children[i].body.y, dictionary[i*4].enska,  
        { font: "16px Comic Sans MS", fill: this.generateHexColor()}));
    }
    this.text1.setAll('anchor.x', 0.5);
    this.text1.setAll('anchor.y', 0.5);

    this.text2 = this.add.text(0, 0,dictionary[textNumber].enska+" = "+dictionary[textNumber].islenska,{ font: "18px Arial Black", fill: "#FFFFFF" });
    this.text2.alpha = 0;

    //------------------------------
    //-----------controls-------------
    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.pauseButton = this.input.keyboard.addKey(Phaser.Keyboard.P);
    
    this.aButton = this.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sButton = this.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dButton = this.input.keyboard.addKey(Phaser.Keyboard.D);
    this.fButton = this.input.keyboard.addKey(Phaser.Keyboard.F);

    var buttonInRange = new Phaser.Signal();
	},
    //is automaticly called by Phaser.game every Game Loop
	update: function() {
        //delta time is the amount of time in millisec between eatch update
        this.deltaTime = this.time.elapsedMS / 1000;
		
        //handle controler events
        if (this.cursors.left.isDown){
            this.player.moveLeft(this.deltaTime);
        }else if (this.cursors.right.isDown){
            this.player.moveRight(this.deltaTime);
        }else{
            if (this.player.playerFacing != 'idle'){
                this.player.animations.stop();
                if (this.player.playerFacing == 'left'){
                    this.player.frame = 21;
                }else{
                    this.player.frame = 16;
                }
                this.player.playerFacing = 'idle';
            }
        }    
        //collition for player and map
        this.physics.arcade.collide(this.player, this.layer);

        if (this.jumpButton.isDown && this.player.body.onFloor() && this.time.now > this.jumpTimer)
        {
            this.player.body.velocity.y = -600;
            this.jumpTimer = this.time.now + 750;
            this.player.frame = 5;
        }
        
        for (var i = 0; i < this.enemy.children.length; i++){
            isWithinRange[i] = (
                (this.player.body.x > this.enemy.children[i].body.x - 400) && 
                (this.player.body.x < this.enemy.children[i].body.x + 200) && 
                (this.player.body.y < this.enemy.children[i].body.y +500) && 
                (this.player.body.y > this.enemy.children[i].body.y - 500)
            )
            if(isWithinRange[i]){
            }
        }

        if((isWithinRange[0]||isWithinRange[1]||isWithinRange[2]) && this.button1.alpha === 0){                
            
            for (var i = 0; i < this.enemy.children.length; i++){
                if(isWithinRange[i] && this.button1.alpha === 0){
                    myEnemyText = i*4;
                    this.shuffleWords(this.wordArray[i]);
                    this.updateButtons(this.wordArray[i]);
                    if(textNumber + 4 < 12){
                        textNumber=((i+1)*4)
                    };
                }
            }
            this.makeVisible(true);

        }else if(!(isWithinRange[0]||isWithinRange[1]||isWithinRange[2]) && this.button1.alpha === 1){
            this.makeVisible(false);
        }

        //----collition detection for various events----
        //----------------------------------------------
        this.physics.arcade.collide(this.enemy, this.layer);
        this.physics.arcade.collide(this.enemy,this.player, function(player, enemy) {
            this.player.looseLife();
        },null, this);

        this.physics.arcade.collide(this.player, this.script, this.collectScript, null, this);
        this.physics.arcade.collide(this.player, this.layer3, function(player, layer3){
            this.player.looseLife(this.time.now);
        },null, this);

        this.physics.arcade.collide(this.player, this.door, function(player, door){
            isWithinRange = [];
            this.makeVisible(false);    
            this.player.nextlevel(false, this.time.now);
        }, null, this);
        
        this.pauseButton.onDown.add(this.pause, this);        

        this.aButton.onDown.add(this.isCorrect, this.button1, null, this.enemy, this.text1, this.updateScore, this.player);
        this.sButton.onDown.add(this.isCorrect, this.button2, null, this.enemy, this.text1, this.updateScore, this.player);
        this.dButton.onDown.add(this.isCorrect, this.button3, null, this.enemy, this.text1, this.updateScore, this.player);
        this.fButton.onDown.add(this.isCorrect, this.button4, null, this.enemy, this.text1, this.updateScore, this.player);

        //text is set to follow enemy
        for (var i = 0; i < this.enemy.children.length; i++){
            this.text1.children[i].x = this.enemy.children[i].x;
            this.text1.children[i].y = this.enemy.children[i].y - 50;
            if(this.enemy.children[i].body.blocked.left === true || this.enemy.children[i].body.blocked.right === true){
                this.enemy.children[i].scale.x *= -1;
            }
        }
	},
    //render debugs
    render: function(){
        //this was used for debuging e.g:
        //this.game.debug.text("FPS: " + this.game.time.fps, 2, 14,"#00ff00");
    },
    //pause the game
    pause: function(){
        this.physics.arcade.isPaused = (this.physics.arcade.isPaused) ? false : true;
    },
    //make buttons on bottom of screen visable
    //disclamer: within the Phaser game engine objects with alpha=0 
    //are not renderd
    makeVisible: function(isHidden){
        if(isHidden){
            this.button1.alpha = 1;
            this.button2.alpha = 1;
            this.button3.alpha = 1;
            this.button4.alpha = 1;
        } else{
            this.button1.alpha = 0;
            this.button2.alpha = 0;
            this.button3.alpha = 0;
            this.button4.alpha = 0;
        }
    },
    //Did the user press the right button to kill enemy
    isCorrect: function(btn, enemy, texti, update, player){
        var buttonText = this.buttonText._text;
        if(buttonText===dictionary[myEnemyText].islenska){
            enemy.children[myEnemyText/4].kill();
            texti.children[myEnemyText/4].kill();
            update(100);
        } else {
            player.looseLife();
        }
    },
    //when player and scripts collide
    collectScript: function(player, script) {
        script.destroy();
        this.updateScore(10)
        this.text2.setText(dictionary[textNumber].enska+" = "+dictionary[textNumber].islenska,true);
        this.text2.setStyle({font: "22px Comic Sans MS", fontStyle: "bold", fill: this.generateHexColor()},true);
        //this.tempScriptTime = this.time.now + 3000;
        this.text2.x = script.x -100;
        this.text2.y = script.y -200;
        this.text2.alpha = 1;
        if(textNumber<dictionary.length){
            textNumber++;
        }
    },
    //update players score in database
    updateScore: function(score){
        $.ajax({
            type: 'POST',
            url: '/updatescore',
            data: {score: score}
        });
    },
    //hide text that is learnd with each script
    hideScript: function(){
        this.text2.alpha = 0;
    },
    //Generate random color
    generateHexColor: function() { 
        return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
    },
    //update text on buttons
    updateButtons: function(array){
        this.button1.setText(array[0]);
        this.button2.setText(array[1]);
        this.button3.setText(array[2]);
        this.button4.setText(array[3]);
    },
    //initalize array with text from dictionary
    setArray: function(pos){
        var array = [];

        for(var i = 0; i < 4; i++){
            array[i] = dictionary[i+pos].islenska;
        }
        return array;
    },
    //shuffle strings in array
    shuffleWords: function(array){
        for(let i = array.length; i; i--){
            let j = Math.floor(Math.random()*i);
            [array[i-1], array[j]] = [array[j], array[i-1]];
        }
    },
    //called when user switches states
    //that is player goes from lvl 1 to lvl 2
    shutdown: function(){
        this.button1.destroy();
        this.button1 = null;
        this.button2.destroy();
        this.button2 = null;
        this.button3.destroy();
        this.button3 = null;
        this.button4.destroy();
        this.button4 = null;
        this.enemy.removeAll(true);
        this.enemy = null;
        this.player.destroy();
        this.player = null;
    }
};
