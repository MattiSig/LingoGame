Lingo.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

Lingo.Preloader.prototype ={
	//preloads images for game.js
	preload: function () {

		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.tilemap('tilemap', '../../images/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', '../../images/tiles.png');
    this.load.image('player', '../../images/stockman.png');
    this.load.spritesheet('ms', '../../images/mummy.png', 37, 45, 18);
    this.load.image('city', '../../images/city.jpg');
	},
	//when preload finishes start game state (Game.js)
	create: function () {

		this.state.start('Game');

	}

};