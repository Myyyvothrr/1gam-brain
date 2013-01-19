ig.module
(
	'game.entities.muzzle'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityMuzzle = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/muzzle.png', 5, 5),
		size: { x: 5, y: 5 },
		offset: { x: 0, y: 0 },
		gravityFactor: 0,

		zIndex: 13,

		timer: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 0.1, [0, 1]);

			if (settings.dir < 0)
				this.currentAnim.flip.x = true;

			this.timer = new ig.Timer(0.2);
		},

		update: function()
		{
			this.parent();

			if (this.timer.delta() > 0)
				this.kill();
		},
	});
});