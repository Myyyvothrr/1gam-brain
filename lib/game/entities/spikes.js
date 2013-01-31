ig.module
(
	'game.entities.spikes'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntitySpikes = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/spikes.png', 8, 8),
		size: { x: 5, y: 7 },
		offset: { x: 2, y: 1 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 1,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
		},

		check: function(other)
		{
			other.kill();
		},

		kill: function()
		{
		}
	});
});