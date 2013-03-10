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
		size: { x: 6, y: 8 },
		offset: { x: 1, y: 0 },

		collides: ig.Entity.COLLIDES.PASSIVE,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		gravityFactor: 4,

		maxVel: { x: 20, y: 200 },
		friction: { x: 0, y: 0 },

		zIndex: 17,

		killed_sound: new ig.Sound('media/killed.*'),

		_pool_manager: null,

		boss: false,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			if (settings.boss)
				this.boss = settings.boss;

			this.addAnim('idle', 0.1, [0, 1, 2, 3]);

			this.accel.x = 100;
			this.maxVel.x = 20 + 5 * Math.random();

			if (ig.game.get_pool_manager)
				this._pool_manager = ig.game.get_pool_manager(EntityAlienBlood);

			if (this.boss)
			{
				this.maxVel.x = 100 + 10 * Math.random();
				this.accel.x = -40;
				this.accel.y = -50;
				this.vel.x = -10;
				this.vel.y = -50;
				this.gravityFactor = 0.6;
			}
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
			  	if (!this.boss)
				{
					this.vel.x *= -1;
			   		this.accel.x *= -1;
				}
			}
			else
			{
				if (this.boss)
				{
					this.boss = false;

					this.accel.x = 100;
					this.accel.y = 0;
					this.maxVel.x = 20 + 5 * Math.random();
					this.vel.x = 0;
					this.vel.y = 0;
					this.gravityFactor = 1;
				}
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
				this._pool_manager.spawn(this.pos.x+this.size.x*Math.random(), this.pos.y+this.size.y*Math.random());

			this.parent();
		}
	});
});