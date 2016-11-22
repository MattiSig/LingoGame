Lingo.MainMenu = function(game) {
	this.mainButton1;
	this.mainButton2;
	this.mainButton3;
	this.mainButton4;
	this.message;
	this.game = game;
};

var level;

Lingo.MainMenu.prototype = {

	create: function() {
		function getRandomColor() {
	    	var letters = '0123456789ABCDEF';
	    	var color = '#';
	    	for (var i = 0; i < 6; i++ ) {
	        	color += letters[Math.floor(Math.random() * 16)];
	    	}
	    	return color;
		}

		this.stage.backgroundColor = getRandomColor();

		// - Main Menu Button 1
		this.mainButton1 = new Lingo.Button(this.game, this.world.centerX, this.world.centerY + 150, 'text1', 'sprite-button', false);
		this.add.existing(this.mainButton1);
		this.mainButton1.alpha = 0;
		// this.mainButton1 =  this.add.button(this.world.centerX, this.world.centerY + 150, 'sprite-button', this.clickNewGame, this, 1, 0);
		// this.mainButton1.onInputOver.add(this.over, this);
  //   	this.mainButton1.onInputOut.add(this.out, this);
		// this.mainButton1.anchor.setTo(0.5,0.5);	

		// - Main Menu Button 2
		this.mainButton2 = new Lingo.Button(this.game, this.world.centerX, this.world.centerY + 50, 'text2', 'sprite-button', false);
		this.add.existing(this.mainButton2);
		this.mainButton2.alpha = 0;
		// this.mainButton2 =  this.add.button(this.world.centerX, this.world.centerY + 50, 'sprite-button', this.clickNewGame, this, 1, 0);
		// this.mainButton2.onInputOver.add(this.over, this);
  //   	this.mainButton2.onInputOut.add(this.out, this);
		// this.mainButton2.anchor.setTo(0.5,0.5);	

		// - Main Menu Button 3
		this.mainButton3 = new Lingo.Button(this.game, this.world.centerX, this.world.centerY - 50, 'text3', 'sprite-button', false);
		this.add.existing(this.mainButton3);
		this.mainButton3.alpha = 0;
		// this.mainButton3 =  this.add.button(this.world.centerX, this.world.centerY - 50, 'sprite-button', this.clickNewGame, this, 1, 0);
		// this.mainButton3.onInputOver.add(this.over, this);
  //   	this.mainButton3.onInputOut.add(this.out, this);
		// this.mainButton3.anchor.setTo(0.5,0.5);	

		// - Main Menu Button 4
		this.mainButton4 = new Lingo.Button(this.game, this.world.centerX, this.world.centerY - 150, 'text4', 'sprite-button', false);
		this.add.existing(this.mainButton4);
		this.mainButton4.alpha = 0;
		// this.mainButton4 =  this.add.button(this.world.centerX, this.world.centerY - 150, 'sprite-button', this.clickNewGame, this, 1, 0);
		// this.mainButton4.onInputOver.add(this.over, this);
  //   	this.mainButton4.onInputOut.add(this.out, this);
		// this.mainButton4.anchor.setTo(0.5,0.5);	

		// this.message = this.add.text(this.world.centerX, 350, "Press button below to play", { font: "14px Arial Black", fill: "#FFFFFF" });
  //   	this.message.anchor.setTo(0.5, 0.5);
	},
	clickNewGame: function() {
		$.ajax({
			type: 'GET',
			url: '/getLevel',
			async: false,
			success: function(data){
				level = 'Level' + data.level.toString();
				setLevel(level);
			}
		});

		function setLevel(userLevel){
			level = userLevel;
		
		}
		this.state.start(level);

	},
	over: function() {
    	// console.log('button over');
	},
	out: function() {
    	// console.log('button out');
	}
};