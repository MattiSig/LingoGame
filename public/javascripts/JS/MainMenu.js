Lingo.MainMenu = function(game) {
	this.mainButton1;
	this.mainButton2;
	this.mainButton3;
	this.highScoreText1;
	this.highScoreText2;
	this.highScoreText3;
	this.highScoreText4;
	this.highScoreText5;
	this.message;
	this.game = game;
};

var level;
var highScoreText = new Array(5);

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

		this.stage.backgroundColor = this.getRandomColor();

		this.mainButton1 =  this.add.button(this.world.centerX, this.world.centerY - 50, 'main-button', this.clickNewGame, this, 2, 1, 0);
		this.mainButton1.anchor.setTo(0.5,0.5);	
		this.mainButton1.alpha = 1;

		this.mainButton2 =  this.add.button(this.world.centerX, this.world.centerY + 50, 'main-button', this.toScore, this, 2, 1, 0);
		this.mainButton2.anchor.setTo(0.5,0.5);	
		this.mainButton2.alpha = 1;

		this.mainButton3 =  this.add.button(this.world.centerX - 250, this.world.centerY + 150, 'main-button', this.back, this, 2, 1, 0);
		this.mainButton3.anchor.setTo(0.5,0.5);	
		this.mainButton3.alpha = 0;
		this.mainButton3.input.enabled = false;

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
		this.state.start('Level1');

	},
	clickScore: function(){
		$.ajax({
			type: 'GET',
			url: '/getScore',
			async: false,
			success: function(data){
				setText(data);
			}
		});

		function setText(highScore){
			for(var i = 0; i < highScoreText.length; i++){
				highScoreText[i] = highScore[i];
			}
			console.log(highScoreText);
		}

		this.highScoreText1 = this.add.text(this.world.centerX - 250, this.world.centerY-100, highScoreText[0].email+" - "+highScoreText[0].score,{ font: "24px Comic Sans MS", fill: this.getRandomColor() });
		//this.highScoreText1.anchor.setTo(0.5, 0.5);
		this.highScoreText2 = this.add.text(this.world.centerX - 250, this.world.centerY-75, highScoreText[1].email+" - "+highScoreText[1].score,{ font: "24px Comic Sans MS", fill: this.getRandomColor() });
		//this.highScoreText2.anchor.setTo(0.5, 0.5);
		this.highScoreText3 = this.add.text(this.world.centerX - 250, this.world.centerY-50, highScoreText[2].email+" - "+highScoreText[2].score,{ font: "24px Comic Sans MS", fill: this.getRandomColor() });
		//this.highScoreText3.anchor.setTo(0.5, 0.5);
		this.highScoreText4 = this.add.text(this.world.centerX - 250, this.world.centerY-25, highScoreText[3].email+" - "+highScoreText[3].score,{ font: "24px Comic Sans MS", fill: this.getRandomColor() });
		//this.highScoreText4.anchor.setTo(0.5, 0.5);
		this.highScoreText5 = this.add.text(this.world.centerX - 250, this.world.centerY, highScoreText[4].email+" - "+highScoreText[4].score,{ font: "24px Comic Sans MS", fill: this.getRandomColor() });
		//this.highScoreText5.anchor.setTo(0.5, 0.5);

	},
	toScore: function() {
    	this.mainButton1.destroy();
		this.mainButton2.destroy();

		this.mainButton3.alpha = 1;
		this.mainButton3.input.enabled = true;
		this.clickScore();
	},
	back: function() {

		this.mainButton3.destroy();
		this.highScoreText1.destroy();
		this.highScoreText2.destroy();
		this.highScoreText3.destroy();
		this.highScoreText4.destroy();
		this.highScoreText5.destroy();
		this.create();
	},

	getRandomColor: function() {
	    	var letters = '0123456789ABCDEF';
	    	var color = '#';
	    	for (var i = 0; i < 6; i++ ) {
	        	color += letters[Math.floor(Math.random() * 16)];
	    	}
	    	return color;
		}
};