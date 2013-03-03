ig.module
(
	'game.entities.cannonball'
)
.requires
(
	'impact.entity',
	'game.entities.pooled'
)
.defines(function()
{
	EntityCannonball = EntityPooled.extend(
	{
		animSheet: new ig.AnimationSheet('media/cannonball.png', 8, 8),
		size: { x: 6, y: 6 },
		offset: { x: 1, y: 1 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 33,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			if (settings.dir < 0)
				this.currentAnim.flip.x = true;

			this.vel.x = settings.dir * 120;
		},

		update: function()
		{
			if (this.destroyed)
				return;

			if (this.vel.x == 0)	// hängt an level tile
				this.kill();

			// TODO: außerhalb von level killen!

			this.parent();
		},

		check: function(other)
		{
			if (this.destroyed)
				return;
			
			other.kill();
			this.kill();
		},
	});
});