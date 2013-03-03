ig.module
(
	'game.entities.gate2'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityGate2 = ig.Entity.extend(
	{
		STATE:
		{
			CLOSED: 0,
			OPENING: 1,
			CLOSING: 2,
			OPEN: 3,
		},

		animSheet: new ig.AnimationSheet('media/gate2.png', 8, 26),
		size: { x: 3, y: 26 },
		offset: { x: 3, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.FIXED,

		zIndex: 37,

		timer: null,

		duration_opening: 5,
		duration_open: 5,
		duration_closing: 5,

		state: 0,

		open_sound: new ig.Sound('media/gate1.*'),
		close_sound: new ig.Sound('media/gate2.*'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.timer = new ig.Timer(0);
			this.timer.pause();

			this.addAnim('idle', 1, [0]);
			this.addAnim('open', 0.5, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], true);
			this.addAnim('close', 0.5, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], true);
		},

		update: function()
		{
			if (ig.game.player)
			{
				if (ig.game.player.pos.x > this.pos.x)
					this.zIndex = -37;
				else
					this.zIndex = 37;
			}

			switch (this.state)
			{
				case this.STATE.CLOSED:
				{
					this.currentAnim = this.anims.idle;
					break;
				}
				case this.STATE.OPEN:
				{
					if (this.timer.delta() > 0)
					{
						this.timer.pause();
						this.close();
					}
					
					break;
				}
				case this.STATE.OPENING:
				{
					this.currentAnim = this.anims.open;
					this.size.y = (-1*this.timer.delta()).map(0, this.duration_opening, 1, 25);

					if (this.timer.delta() > 0)
					{
						if (this.duration_open > 0)
							this.timer.set(this.duration_open);
						else
							this.timer.pause();
						
						this.state = this.STATE.OPEN;
					}

					break;
				}
				case this.STATE.CLOSING:
				{
					this.currentAnim = this.anims.close;
					this.size.y = (-1*this.timer.delta()).map(0, this.duration_closing, 25, 1);

					if (this.timer.delta() > 0)
					{
						this.timer.pause();
						this.state = this.STATE.CLOSED;
					}

					break;
				}
				default:
				{
					break;
				}
			}

			this.parent();
		},

		open: function(duration_opening, duration_open, duration_closing)
		{
			if (this.state == this.STATE.CLOSED)
			{
				if (this.distanceTo(ig.game.player) < 55)
					this.open_sound.play();

				this.duration_opening = duration_opening;
				this.duration_open = duration_open;
				this.duration_closing = duration_closing;
				this.state = this.STATE.OPENING;
				this.currentAnim = this.anims.open.rewind();
				this.currentAnim.frameTime = this.duration_opening / 12;
				this.timer.set(this.duration_opening);
			}
		},

		close: function()
		{
			if (this.state == this.STATE.OPEN)
			{
				if (this.distanceTo(ig.game.player) < 55)
					this.close_sound.play();

				this.state = this.STATE.CLOSING;
				this.currentAnim = this.anims.close.rewind();
				this.currentAnim.frameTime = this.duration_closing / 12;
				this.timer.set(this.duration_closing);
			}
		},

		kill: function()
		{
		}
	});
});