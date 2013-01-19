ig.module
(
	'game.entities.ammo'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityAmmo = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/ammo.png', 4, 4),
		size: { x: 4, y: 4},
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
				other.add_ammo();
				ig.game.removeEntity(this);
			}
		},

		kill: function()
		{
		}
	});
});