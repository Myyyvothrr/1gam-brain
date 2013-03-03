ig.module
(
	'game.entities.muzzle'
)
.requires
(
	'impact.entity',
	'game.entities.pooled'
)
.defines(function()
{
	EntityMuzzle = EntityPooled.extend(
	{
		animSheet: new ig.AnimationSheet('media/muzzle.png', 5, 5),
		size: { x: 5, y: 5 },
		offset: { x: 0, y: 0 },
		gravityFactor: 0,

		zIndex: 29,

		timer: null,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 0.1, [0, 1]);

			this.currentAnim = this.anims.idle.rewind();

			if (settings.dir && settings.dir < 0)
				this.currentAnim.flip.x = true;

			if (!this.timer)
				this.timer = new ig.Timer();
			
			this.timer.set(0.2);
		},

		update: function()
		{
			if (this.destroyed)
				return;

			this.parent();

			if (this.timer.delta() > 0)
				this.kill();
		},
	});
});