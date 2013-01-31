ig.module
(
	'game.entities.ladder'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityLadder = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/ladder.png', 8, 8),
		size: { x: 8, y: 8 },
		offset: { x: 0, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 3,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
				other.on_ladder();
		},

		kill: function()
		{
		}
	});
});