ig.module
(
	'game.entities.pipe2'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityPipe2 = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/pipe2.png', 16, 24),
		size: { x: 16, y: 24},
		gravityFactor: 0,

		zIndex: 11,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 0.08 + Math.random() * 0.1, [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		},

		kill: function()
		{
		}
	});
});