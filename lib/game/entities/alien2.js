ig.module
(
	'game.entities.alien2'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityAlien2 = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/alien2.png', 8, 16),
		size: { x: 8, y: 8 },
		offset: { x: 0, y: 8 },
		gravityFactor: 0,

		collides: ig.Entity.COLLIDES.FIXED,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 11,

		timer: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [0, 1, 0, 2]);
		},

		kill: function()
		{
			for (var i = 0; i < 100+200*Math.random(); ++i)
				ig.game.spawnEntity(EntityAlienBlood, this.pos.x+this.size.x*Math.random(), this.pos.y+this.size.y*Math.random());

			this.parent();
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
				other.kill();
		},
	});
});