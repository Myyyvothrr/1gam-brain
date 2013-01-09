ig.module
(
	'game.entities.player'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityPlayer = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/player.png', 8, 16),
		size: { x: 6, y: 14 },
		offset: { x: 1, y: 2 },
		collides: ig.Entity.COLLIDES.ACTIVE,
		type: ig.Entity.TYPE.A,
		health: 1,
		zIndex: 10,

		bounciness: 0,
		minBounceVelocity: 40,
		friction: { x: 0, y: 0 },
		gravityFactor: 1,
		maxVel: { x: 50, y: 75 },

		dir: 0,

		jump_speed: 9000,
		walk_speed: 35,
		run_speed: 35,

		_is_on_ladder: false,
		_ladder_down: false,

		coins: 0,

		font: new ig.Font('media/04b03.font.png'),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('walk', 0.1, [1, 2, 3, 4, 5, 6, 7, 8]);
			this.addAnim('ladder', 0.15, [9, 10]);			
			this.addAnim('jump', 1, [2]);
		},

		update: function()
		{
			if (ig.input.state('left'))
			{
				this.vel.x = -(ig.input.state('run') ? this.run_speed : this.walk_speed);
				this.currentAnim = this.anims.walk;
			}
			else if (ig.input.state('right'))
			{
				this.vel.x = (ig.input.state('run') ? this.run_speed : this.walk_speed);
				this.currentAnim = this.anims.walk;
			}
			else
			{
				this.vel.x = 0;
				this.currentAnim = this.anims.idle;
			}

			if (this._is_on_ladder)
			{

				if (ig.input.state('jump'))
				{
					this.vel.y = -this.maxVel.y*0.7;
					this.currentAnim = this.anims.ladder;
				}
				
				if (ig.input.state('down'))
				{
					this.vel.y = this.maxVel.y*0.7;
					this.currentAnim = this.anims.ladder;
					this._ladder_down = true;
				}
			}
			else
			{
				if (ig.input.pressed('jump') && this.standing)
				{
					this.accel.y = -this.jump_speed;
				}
				else if (ig.input.released('jump'))
				{
					this.accel.y = 0;
					if (this.vel.y < 0)
						this.vel.y = 0;
				}
				else
				{
					this.accel.y = 0;
				}
			}

			// normalisieren? fühlt sich momentan aber "richtig" an

			if (!this.standing && !this._is_on_ladder)
				this.currentAnim = this.anims.jump;

			if (this.vel.x < 0)
				this.dir = -1;
			else if (this.vel.x > 0)
				this.dir = 1;

			if (this.dir < 0)
				this.currentAnim.flip.x = true;
			else if (this.dir > 0)
				this.currentAnim.flip.x = false;

			this.parent();

			ig.game.screen.x = this.pos.x - ig.system.width/2;
			ig.game.screen.y = this.pos.y - ig.system.height/2;

			if (ig.game.screen.x < 0)
				ig.game.screen.x = 0;
			else if (ig.game.screen.x + ig.system.width > ig.game.backgroundMaps[1].width * ig.game.backgroundMaps[1].tilesize)
				ig.game.screen.x = ig.game.backgroundMaps[1].width * ig.game.backgroundMaps[1].tilesize - ig.system.width;

			if (ig.game.screen.y < 0)
				ig.game.screen.y = 0;
			else if (ig.game.screen.y + ig.system.height > ig.game.backgroundMaps[1].height * ig.game.backgroundMaps[1].tilesize)
				ig.game.screen.y = ig.game.backgroundMaps[1].height * ig.game.backgroundMaps[1].tilesize - ig.system.height;

			this._is_on_ladder = false;
			this._ladder_down = false;
		},

		handleMovementTrace: function(res)
		{
			if (this._ladder_down)
			{
				if (!ig.game.collisionMap.trace(this.pos.x, this.pos.y, 0, 8, this.size.x, this.size.y).collision.y)
				{
					this.pos.x += this.vel.x * ig.system.tick;
					this.pos.y += this.vel.y * ig.system.tick;
				}
			}
			else
				this.parent(res);
		},

		draw: function()
		{
			this.parent();

			this.font.draw('Coins: ' + this.coins + '/33', 1, 1, ig.Font.ALIGN.LEFT);
		},

		on_ladder: function()
		{
			this._is_on_ladder = true;
		},

		add_coin: function()
		{
			this.coins++;
		},
	});
});