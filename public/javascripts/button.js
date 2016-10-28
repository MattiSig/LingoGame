var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
function preload() {

    game.load.tilemap('tilemap', '../images/tester.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', '../images/titlestilraun.png');
    game.load.image('player', '../images/dick.png');
    game.load.spritesheet('ms', '../images/mummy.png', 37, 45, 18);

}

var map;
var layer;
var layer2;
var p;
var cursors;
var jumpButton;
var jumpTimer = 0;
var player;
var enemy;
var text1;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.stage.backgroundColor = '#0500FF';
    
    //------------------------
    //---------Level----------
    map = game.add.tilemap('tilemap');

    map.addTilesetImage('hell?', 'tiles');
    
    layer = map.createLayer('Tile Layer 1');
    layer2 = map.createLayer('drasl');
    layer.wrap = true;
    layer2.wrap = true;
    layer.resizeWorld();
    layer2.resizeWorld();
    
    map.setCollisionByExclusion([],true, 'Tile Layer 1');
    
    //------------------------------
    //-----------player-------------
    player = game.add.sprite(32, 32, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.enableBody = true;
    player.physicsBodyType = Phaser.Physics.ARCADE;

    player.body.tilePadding.set(32);
    player.body.collideWorldBounds = true;

    game.camera.follow(player);
    game.physics.arcade.gravity.y = 250;
    
    //-----------enemy-------------------
    //----------------------------------
    
    enemy = game.add.sprite(1222, 32, 'ms');

    enemy.animations.add('walk');

    enemy.animations.play('walk', 50, true);

    //game.add.tween(enemy).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.enableBody = true;
    enemy.physicsBodyType = Phaser.Physics.ARCADE;

    enemy.body.tilePadding.set(32);
    enemy.body.collideWorldBounds = true;
    enemy.body.velocity.x = 50;
    enemy.body.bounce.x = 1;

    //--------------texti----------
    //------------------------------

    text1 = game.add.text(enemy.body.x, enemy.body.y, "afturganga", { font: "14px Arial Black", fill: "#FFFFFF" });
    text1.anchor.setTo(0.5, 0.5);
    //-------------buttons----------
    //----------------------------
    
    /*button = game.add.button(50, 100, 'zombie', actionOnClick(), this, 2, 1, 0);
    button.fixedToCamera = true;
    button.cameraOffset.setTo(50, 100);*/
    
    //---------controls-----
    
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {

    game.physics.arcade.collide(player, layer, function(s, t) {           }, null, this);
    game.physics.arcade.collide(enemy, layer, function(s, t) {      console.log("vondurkall")        }, null, this);
    
    game.physics.arcade.collide(enemy,player,function(s, t) {
        player.kill();
        
        game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
        
        game.stage.backgroundColor = '#000000';

    /*------< database kukl >-------*/

        $.ajax({
            url:'/',
            type: 'POST',
            success: function(data){
                console.log('fucking virkar kannski');
            }
        })



    })
    player.body.velocity.x = 0;
    
    text1.x = enemy.body.x ;
    text1.y = enemy.body.y - 20;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

    }
    
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }
}

/*function actionOnClick () {

    background.visible =! background.visible;

    $.ajax({
        url:'/',
        type: 'POST',
        success: function(data){
            console.log('fucking virkaði!!');
        }
    })

}*/