ig.module
(
	'game.entities.door'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityDoor = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/door.png', 16, 24),
		size: { x: 16, y: 24 },
		offset: { x: 0, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NONE,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 10,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('open', 0.15, [1, 2], true);
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				if (this.currentAnim != this.anims.open)
					this.currentAnim = this.anims.open.rewind();
			}
		},

		kill: function()
		{
		}
	});
});