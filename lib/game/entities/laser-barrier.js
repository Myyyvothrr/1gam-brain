ig.module
(
	'game.entities.laser-barrier'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityLaserBarrier = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/laser-barrier.png', 8, 18),
		size: { x: 2, y: 18 },
		offset: { x: 3, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 35,

		timer: null,

		time_closed: 5,
		time_open: 5,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('open', 0.07, [0, 1, 2, 3, 4, 5, 6, 7], true);
			this.addAnim('close', 0.07, [7, 6, 5, 4, 3, 2, 1, 0], true);

			this.timer = new ig.Timer(this.time_closed);
		},

		update: function()
		{
			this.parent();

			if (ig.game.player)
			{
				if (ig.game.player.pos.x > this.pos.x)
					this.zIndex = -35;
				else
					this.zIndex = 35;
			}

			if (this.timer.delta() > this.time_closed)
			{
				if (this.currentAnim != this.anims.open)
					this.currentAnim = this.anims.open.rewind();

				if (this.timer.delta() > this.time_open + this.time_closed)
				{
					this.timer.set(this.time_closed);
					
					if (this.currentAnim != this.anims.close)
						this.currentAnim = this.anims.close.rewind();
				}
			}
		},

		check: function(other)
		{
			if (this.timer.delta() <= this.time_closed)
			{
				if (other instanceof EntityPlayer)
					other.kill();
			}
		},

		kill: function()
		{
		}
	});
});