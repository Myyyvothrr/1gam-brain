ig.module
(
	'game.entities.alien-boss'
)
.requires
(
	'impact.entity',
	'game.entities.alien1',
	'game.entities.alien-boss-laser',
	'game.entities.alien-boss-tentacle'
)
.defines(function()
{
	EntityAlienBoss = ig.Entity.extend(
	{
		STATE:
		{
			SPITTING: 1,	// Spuckt Aliens
			SHOOTING: 2,	// Schießt Laser aus Auge
			TENTACLE: 3,	// Tentakelschlag
		},

		state: 1,

		animSheet: new ig.AnimationSheet('media/boss.png', 224, 192),
		size: { x: 216, y: 192 },
		offset: { x: 8, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		maxVel: { x: 0, y: 50 },
		speed: 1,

		zIndex: 16,
		
		_pool_manager: null,

		_pool_laser: null,
		_pool_tentacle: null,

		timer: 0,

		_shoot_timer: null,

		hitpoints: 10,

		moved: false,

		shoot_pos: 0,

		_init: false,
		_done: false,

		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('open', 1, [1, 0], true);
			this.addAnim('eye', 0.2, [2, 0], true);

			if (ig.game.get_pool_manager)
			{
				this._pool_manager = ig.game.get_pool_manager(EntityAlienBlood);
				this._pool_laser = ig.game.get_pool_manager(EntityAlienBossLaser);
				this._pool_tentacle = ig.game.get_pool_manager(EntityAlienBossTentacle);
			}

			this.timer = new ig.Timer(6);
			this._shoot_timer = new ig.Timer();

			if (ig.game && ig.game.boss_level_draw != 'undefined')
			{
				ig.game.boss_level_draw = true;
				ig.game.boss = this;
			}
		},

		change_state: function(s)
		{
			this.state = s ? s : (1 + 3 * Math.random()).floor();
	
			this.moved = false;
			this._done = false;
			this._init = false;
			
			this.timer.set(2);

			this.shoot_pos = Math.random().map(0, 1, 48, 128).floor();
		},

		move_to: function(y)
		{
			if (this.moved)
				return true;

			if (this.pos.y < y)
				this.pos.y += this.speed;
			else if (this.pos.y > y)
				this.pos.y += -this.speed;

			return (this.moved = Math.abs(this.pos.y - y) < 1);
		},

		update: function()
		{
			this.parent();
			
			switch (this.state)
			{
				case this.STATE.SPITTING:
				{
					if (!this._init)
					{
						if (this.timer.delta() > 0)
						{
							this._init = true;
							this.timer.set(2 + Math.random() * 3);
						}
					}
					else if (this.move_to(48))
					{
						if (!this._done)
						{	
							this._done = true;

							this.currentAnim = this.anims.open.rewind();

							ig.game.spawnEntity(EntityAlien1, this.pos.x+6 + 16 * Math.random(), this.pos.y+156, { boss: true });
						}

						if (this.timer.delta() > 0)
							this.change_state();
					}

					break;
				}
				case this.STATE.SHOOTING:
				{
					if (!this._init)
					{
						if (this.timer.delta() > 0)
						{
							this._init = true;
							this.timer.set(2 + Math.random() * 6);
						}
					}
					else if (this.move_to(this.shoot_pos))
					{						
						if (!this._done)
						{	
							this._done = true;
							this.currentAnim = this.anims.eye.rewind();
						}

						if (this._shoot_timer.delta() > 0)
						{
							this._pool_laser.spawn(this.pos.x+13, this.pos.y + 65);
							this._shoot_timer.set(0.02);
						}

						if (this.timer.delta() > 0)
							this.change_state();
					}

					break;
				}
				case this.STATE.TENTACLE:
				{
					if (!this._init)
					{
						if (this.timer.delta() > 0)
						{
							this._init = true;
							this.timer.set(3 + Math.random() * 2);
						}
					}
					else if (this.move_to(192))
					{
						if (!this._done)
						{	
							this._done = true;

							this._pool_tentacle.spawn(Math.random().map(0, 1, 65, 217), 240);
							this._pool_tentacle.spawn(Math.random().map(0, 1, 65, 217), 240);
							this._pool_tentacle.spawn(Math.random().map(0, 1, 65, 217), 240);
							this._pool_tentacle.spawn(Math.random().map(0, 1, 65, 217), 240);
						}

						if (this.timer.delta() > 0)
							this.change_state();
					}

					break;
				}
				default:
				{
					break;
				}
			}
		},

		hit: function(p)
		{
			if (p.y >= this.pos.y + 62 && p.y <= this.pos.y + 75)
			{
				--this.hitpoints;
				if (this.hitpoints <= 0)
					this.kill();

				for (var i = 0; i < 300+300*Math.random(); ++i)
					this._pool_manager.spawn(this.pos.x+22+20*Math.random(), this.pos.y+65+8*Math.random());

				return true;
			}

			return false;
		},

		kill: function()
		{
			_player_data.stats_kills++;

			ig.system.setGame(FinishedState2);

			this.parent();
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
				other.kill();
		},
	});
});