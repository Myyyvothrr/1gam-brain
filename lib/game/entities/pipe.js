ig.module
(
	'game.entities.pipe'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityPipe = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/pipe.png', 24, 16),
		size: { x: 24, y: 16},
		gravityFactor: 0,

		zIndex: 11,

		flip: false,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			if (this.flip == 1)
			{
				this.addAnim('idle', 0.02 + Math.random() * 0.1, [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
				this.currentAnim.flip.x = true;
			}
			else
			{				
				this.addAnim('idle', 0.08 + Math.random() * 0.1, [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
			}
		},

		kill: function()
		{
		}
	});
});