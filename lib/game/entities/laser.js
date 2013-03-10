ig.module
(
	'game.entities.laser'
)
.requires
(
	'impact.entity',
	'game.entities.pooled'
)
.defines(function()
{
	EntityLaser = EntityPooled.extend(
	{
		animSheet: new ig.AnimationSheet('media/laser.png', 4, 1),
		size: { x: 2, y: 1 },
		offset: { x: 0, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.B,
		maxVel: { x: 160, y: 0 },

		zIndex: 31,

		counter: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			if (settings.dir < 0)
				this.currentAnim.flip.x = true;

			this.vel.x = settings.dir * 160;

			this.counter = 0;
		},

		update: function()
		{
			if (this.destroyed)
				return;

			if (this.vel.x == 0)	// hängt an level tile
				this.kill();

			this.parent();
		},

		check: function(other)
		{
			if (this.destroyed)
				return;
			
			if (other instanceof EntityAlien1 || other instanceof EntityAlien2 || other instanceof EntityPlayer)
			{
				other.kill();

				++this.counter;
				if (this.counter >= 3)
					this.kill();
			}
			else if (other instanceof EntityAlienBoss)
			{
				if (other.hit(this.pos))
					this.kill();
			}
		},
	});
});