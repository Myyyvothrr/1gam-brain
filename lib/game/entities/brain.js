ig.module
(
	'game.entities.brain'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityBrain = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/brain.png', 8, 8),
		size: { x: 8, y: 8},
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 11,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				other.add_brain();
				ig.game.removeEntity(this);
			}
		},

		kill: function()
		{
		}
	});
});