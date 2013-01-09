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
		size: { x: 8, y: 8 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 5,

		timer: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
		},

		update: function()
		{
			this.parent();

			if (this.timer && this.timer.delta() > 0)
				ig.system.setGame(FinishedState);
		},

		check: function(other)
		{
			other.kill();
			this.timer = new ig.Timer(1);
		},
	});
});