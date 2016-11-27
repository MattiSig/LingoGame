'use strict'
var Lingo = {
    
    orientated: false

};
//Starts the Boot state, takes in Phaser.game
Lingo.Boot = function (game) {
};  

Lingo.Boot.prototype = {
    //Preloades image to display while whateing for the rest of images to be preloaded
    preload: function () {

        this.load.image('preloaderBar', '../../images/preload.png');

    },
    //Creates objects within Boot and renders on screen/canvas
    create: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.input.maxPointers = 1;

        //positions canvas within desktop browser window and scales approriately
        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 320;
            this.scale.minHeight = 200;
            this.scale.maxWidth = 800;
            this.scale.maxHeight = 600;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        //posible canvas edits to play on phone
        else
        {
            /*this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize();*/
        }
        //start new state Preloader.js
        this.state.start('Preloader');

    }

};