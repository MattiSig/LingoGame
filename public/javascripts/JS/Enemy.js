Lingo.Enemy = function (game, map, type) {
    this.spawn = map.objects.objectsSpawn;
  Phaser.Group.call(this, game);
  this.physics = game.physics.arcade;
  this.enableBody = true;
  this.physicsBodyType = Phaser.Physics.ARCADE;

  for (var i = 0; i < this.spawn.length; i++){
    if(this.spawn[i].gid === 35){
        var sprite = this.create(this.spawn[i].x, this.spawn[i].y, 'player');    
    }
    
  }
}
Lingo.Enemy.prototype = Object.create(Phaser.Group.prototype);
Lingo.Enemy.prototype.constructor = Lingo.Enemy;

