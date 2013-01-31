ig.module
(
	'game.entities.alien1'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityAlien1 = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/alien1.png', 8, 8),
		size: { x: 8, y: 8 },
		offset: { x: 0, y: 0 },

		collides: ig.Entity.COLLIDES.PASSIVE,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		maxVel: { x: 20, y: 40 },
		friction: { x: 0, y: 0 },

		zIndex: 17,

		timer: 0,

		killed_sound: new ig.Sound('media/killed.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 0.1, [0, 1, 2, 3]);

			this.accel.x = 100;
		},

		update: function()
		{
			if (this.vel.x == 0)
				this.accel.x *= -1;

			this.parent();

			if (this.vel.x < 0)				
				this.currentAnim.flip.x = true;
			else if (this.vel.x > 0)
				this.currentAnim.flip.x = false;

		},

		handleMovementTrace: function(res)
		{
			if(!ig.game.collisionMap.trace(this.pos.x, this.pos.y, (this.vel.x > 0 ? +4 : -7), 1, this.size.x, this.size.y).collision.y)
		    {
		    	this.vel.x *= -1;
		    	this.accel.x *= -1;
			}

			this.parent(res);
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
				other.kill();
		},

		kill: function()
		{
			this.killed_sound.play();

			_player_data.stats_kills++;

			for (var i = 0; i < 100+200*Math.random(); ++i)
				ig.game.spawnEntity(EntityAlienBlood, this.pos.x+this.size.x*Math.random(), this.pos.y+this.size.y*Math.random());

			this.parent();
		}
	});
});