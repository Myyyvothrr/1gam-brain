ig.module
(
	'game.entities.gate3'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityGate3 = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/laser-gate.png', 8, 18),
		size: { x: 2, y: 18 },
		offset: { x: 3, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.FIXED,

		zIndex: 35,

		open_sound: new ig.Sound('media/gate1.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('open', 0.1, [0, 1, 0, 1, 1, 0, 1, 0, 1, 2], true);
		},

		update: function()
		{
			if (ig.game.player)
			{
				if (ig.game.player.pos.x > this.pos.x)
					this.zIndex = -35;
				else
					this.zIndex = 35;
			}

			this.parent();
		},

		open: function()
		{
			if (this.collides != ig.Entity.COLLIDES.NEVER)
			{
				this.type = ig.Entity.TYPE.NONE;
				this.collides = ig.Entity.COLLIDES.NEVER;
				this.currentAnim = this.anims.open.rewind();

				if (this.distanceTo(ig.game.player) < 55)
					this.open_sound.play();
			}
		},

		kill: function()
		{
		}
	});
});