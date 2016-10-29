Lingo.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

Lingo.Preloader.prototype ={

	preload: function () {

		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.tilemap('tilemap', '../../images/tester.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', '../../images/titlestilraun.png');
    this.load.image('player', '../../images/dick.png');
    this.load.spritesheet('ms', '../../images/mummy.png', 37, 45, 18);

	},

	create: function () {

		this.state.start('Game');

	}

};