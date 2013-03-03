ig.module
(
	'game.entities.spikes2'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntitySpikes2 = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/laser_spikes.png', 8, 8),
		size: { x: 5, y: 7 },
		offset: { x: 2, y: 1 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 1,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 0.03 + 0.05*Math.random(), [0, 1, 2, 3, 4, 5, 6]);
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