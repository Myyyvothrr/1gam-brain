ig.module
(
	'game.entities.gate'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityGate = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/gate.png', 8, 18),
		size: { x: 3, y: 18 },
		offset: { x: 5, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.FIXED,

		zIndex: 35,

		open_sound: new ig.Sound('media/gate1.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('open', 1, [1]);
		},

		open: function()
		{
			if (this.collides != ig.Entity.COLLIDES.NEVER)
			{
				this.type = ig.Entity.TYPE.NONE;
				this.collides = ig.Entity.COLLIDES.NEVER;
				this.currentAnim = this.anims.open;

				if (this.distanceTo(ig.game.player) < 55)
					this.open_sound.play();
			}
		},

		kill: function()
		{
		}
	});
});