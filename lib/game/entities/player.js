ig.module
(
	'game.entities.player'
)
.requires
(
	'impact.entity',
	'game.entities.bullet',
	'game.entities.blood',
	'game.entities.coin',
	'game.entities.laser'
)
.defines(function()
{
	EntityPlayer = ig.Entity.extend(
	{
		STATE:
		{
			IDLE: 0,				// Stehen / Fallen
			WALKING: 1,				// Normales Laufen
			RUNNING: 2,				// Rennen
			SLIDING: 3,				// Wenn während Rennen geduckt wird
			DUCKING: 4,				// Ducken gedrückt von Idle oder Laufen
			JUMPING: 5,				// Springen
			LADDER: 6,				// An Leiter
			SHOOTING: 7,			// Schießen
			HANDLE: 8,				// Schalter an Decke
			KILLED: 100,			// Tot
			PLATFORM: 11,			// Steht auf Platform
		},

		animSheet: new ig.AnimationSheet('media/player.png', 8, 16),
		size: { x: 6, y: 14 },
		offset: { x: 1, y: 2 },
		collides: ig.Entity.COLLIDES.ACTIVE,
		type: ig.Entity.TYPE.A,
		health: 1,
		zIndex: 21,

		bounciness: 0,
		minBounceVelocity: 40,
		friction: { x: 0, y: 0 },
		gravityFactor: 1,
		maxVel: { x: 100, y: 75 },

		shoot_sound: new ig.Sound('media/shoot.*'),
		killed_sound: new ig.Sound('media/killed2.*'),

		state: 0,

		dir: 1,

		data: 0,

		jump_speed: 9000,
		walk_speed: 35,
		run_speed: 50,

		standing_on_entity: false,

		_platform: null,
		_handle: null,
		_is_on_ladder: false,
		_ladder_down: false,

		_look_down: false,

		_slide_timer: null,
		_shoot_timer: null,
		_duck_timer: null,

		LEARNED:
		{
			WALKING: 1,
			JUMPING: 2,
			RUNNING: 3,
			SLIDING: 4,
			SHOOTING: 5,
		},

		last_checkpoint: 0,
		level_checkpoint: 0,

		_pool_manager_blood: null,
		_pool_manager_bullets: null,
		_pool_manager_lasers: null,

		_boss_level_pan: false,
		_boss_level_pan_timer: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			ig.game.player = this;

			this.level_checkpoint = { x: this.pos.x, y: this.pos.y };

			this.addAnim('idle', 1, [0]);
			this.addAnim('slow', 0.2, [1, 2, 3, 4, 5, 6, 7, 8]);
			this.addAnim('walk', 0.1, [1, 2, 3, 4, 5, 6, 7, 8]);
			this.addAnim('run', 0.08, [1, 2, 3, 4, 5, 6, 7, 8]);
			this.addAnim('ladder', 0.15, [9, 10]);			
			this.addAnim('jump', 1, [2]);		
			this.addAnim('handle', 1, [11]);
			this.addAnim('ducking', 1, [12]);
			this.addAnim('sliding', 1, [13]);
			this.addAnim('shoot', 1, [14]);
			this.addAnim('killed', 1, [15]);
//			this.addAnim('shoot2', 1, [16]);

			this._slide_timer = new ig.Timer(0);
			this._slide_timer.pause();

			this._shoot_timer = new ig.Timer(0);
			this._shoot_timer.pause();

			this._duck_timer = new ig.Timer(0);
			this._duck_timer.pause();

			if (ig.game.get_pool_manager)
			{
				this._pool_manager_blood = ig.game.get_pool_manager(EntityBlood);
				this._pool_manager_bullet = ig.game.get_pool_manager(EntityBullet);
				this._pool_manager_lasers = ig.game.get_pool_manager(EntityLaser);
			}

			if (ig.game.loading_started != 'undefined')
				ig.game.loading_started = false;

			if (this.boss && this.boss == 1)
			{
				this._boss_level_pan = true;
				this._boss_level_pan_timer = new ig.Timer(10);
			}
		},

		update_walk_run: function()
		{
			if (_player_data.learned >= this.LEARNED.WALKING)
			{
				if (ig.input.state('left'))
				{
					this.vel.x = -((ig.input.state('run') && _player_data.learned >= this.LEARNED.RUNNING) ? this.run_speed : this.walk_speed);
					this.state = ((ig.input.state('run') && _player_data.learned >= this.LEARNED.RUNNING) ? this.STATE.RUNNING : this.STATE.WALKING);
				}
				else if (ig.input.state('right'))
				{
					this.vel.x = ((ig.input.state('run') && _player_data.learned >= this.LEARNED.RUNNING) ? this.run_speed : this.walk_speed);
					this.state = ((ig.input.state('run') && _player_data.learned >= this.LEARNED.RUNNING) ? this.STATE.RUNNING : this.STATE.WALKING);
				}
				else
				{
					this.vel.x = 0;
				}
			}
			else
			{
				if (ig.input.state('left'))
				{
					this.vel.x = -this.walk_speed*0.25;
					this.state = this.STATE.WALKING;
				}
				else if (ig.input.state('right'))
				{
					this.vel.x = this.walk_speed*0.25;
					this.state = this.STATE.WALKING;
				}
				else
				{
					this.vel.x = 0;
				}
			}
		},

		update_jump: function()
		{
			if (_player_data.learned < this.LEARNED.JUMPING)
				return;

			if (ig.input.pressed('jump') && this.standing)
			{
				this.accel.y = -this.jump_speed;
				this.state = this.STATE.JUMPING;
			}
			else if (ig.input.released('jump'))
			{
				this.accel.y = 0;
				this.state = this.STATE.IDLE;
				if (this.vel.y < 0)
					this.vel.y = 0;
			}
			else
			{
				this.accel.y = 0;
			}
		},

		update_shooting: function()
		{
			if (_player_data.learned < this.LEARNED.SHOOTING)
				return;

			if (ig.input.pressed('shoot'))
			{
				if (_player_data.selected_weapon == 0 && _player_data.bullets > 0)
				{
					this.addAnim('shoot', 1, [14]);

					--_player_data.bullets;
					this.state = this.STATE.SHOOTING;
					this._shoot_timer.set(0.5);
					
					if (this.standing)
						this.vel.x = 0;

					this.shoot_sound.play();

					_player_data.stats_shots_fired++;

					this._pool_manager_bullet.spawn(this.pos.x+(this.dir > 0 ? 7 : -3), this.pos.y+6, { dir: this.dir });
				}
				else if (_player_data.selected_weapon == 1 && _player_data.laser_ammo > 0)
				{

					this.addAnim('shoot', 1, [16]);

					--_player_data.laser_ammo;
					this.state = this.STATE.SHOOTING;
					this._shoot_timer.set(0.2);
					
					if (this.standing)
						this.vel.x = 0;

					this.shoot_sound.play();

					_player_data.stats_shots_fired++;

					this._pool_manager_lasers.spawn(this.pos.x+(this.dir > 0 ? 7 : -3), this.pos.y+6, { dir: this.dir });
				}
			}			
		},

		update_ducking: function()
		{
			if (ig.input.state('down'))
			{
				this.state = this.STATE.DUCKING;
				
				if (this._duck_timer.pausedAt)
					this._duck_timer.set(1);

				this.vel.x = 0;
			}
			else
			{
				this._duck_timer.pause();

				if (this.state == this.STATE.DUCKING)
					this.state = this.STATE.IDLE;
			}
		},

		update_sliding: function()
		{
			if (_player_data.learned < this.LEARNED.SLIDING)
				return;

			if (ig.input.pressed('down'))
			{
				this.state = this.STATE.SLIDING;
				
				if (this._slide_timer.pausedAt)
				{
					this._slide_timer.set(0.3);
					
					this.size.x = 6;
					this.size.y = 8;
					this.offset.x = 1;
					this.offset.y = 8;
					this.pos.y += 6;
				}
			}
		},

		update: function()
		{
			if (_player_data && _player_data.to != null)
			{
				this.pos.x = _player_data.to.x;
				this.pos.y = _player_data.to.y;
				this.dir = _player_data.to.dir;
				_player_data.to = null;
			}

			switch (this.state)
			{
				case this.STATE.IDLE:
				{
					this.update_walk_run();
					this.update_jump();
					this.update_shooting();
					this.update_ducking();

					break;
				}
				case this.STATE.WALKING:
				{
					this.update_walk_run();

					if (this.vel.x == 0)
						this.state = this.STATE.IDLE;

					this.update_jump();
					this.update_shooting();
					this.update_ducking();
					
					break;
				}
				case this.STATE.RUNNING:
				{					
					this.update_walk_run();

					if (this.vel.x == 0)
						this.state = this.STATE.IDLE;

					this.update_jump();
					this.update_shooting();
					this.update_sliding();

					break;
				}
				case this.STATE.SLIDING:
				{
					if (this._slide_timer.delta() > 0)
					{
						this.state = this.STATE.IDLE;
						this._slide_timer.pause();

						this.size.x = 6;
						this.size.y = 14;
						this.offset.x = 1;
						this.offset.y = 2;
						this.pos.y -= 6;
					}
					else
					{
						this.vel.x *= 1.75;
					}

					break;
				}
				case this.STATE.DUCKING:
				{
					this.update_walk_run();
					this.update_ducking();

					if (this._duck_timer.delta() > 0)
					{
						this._look_down = true;
					}

					break;
				}
				case this.STATE.JUMPING:
				{
					this.update_walk_run();
					this.update_jump();
					this.update_shooting();

					if (this.accel.y == 0)
						this.state = this.STATE.IDLE;

					break;
				}
				case this.STATE.LADDER:
				{
					this.state = this.STATE.IDLE;
					this.update_walk_run();

					this._ladder_down = false;

					if (ig.input.state('jump'))
					{
						this.vel.y = -this.maxVel.y*0.7;
						this._is_on_ladder = true;
					}
					else if (ig.input.state('down'))
					{
						this.vel.y = this.maxVel.y*0.7;
						this._ladder_down = true;
						this._is_on_ladder = true;
					}
					else
					{
						this.update_shooting();
					}

					break;
				}
				case this.STATE.SHOOTING:
				{
					if (this._shoot_timer.delta() > 0)
					{
						this.state = this.STATE.IDLE;
						this._shoot_timer.pause();
					}
					else
					{
						this.update_jump();
						this.state = this.STATE.SHOOTING;			
					}

					break;
				}
				case this.STATE.HANDLE:
				{
					if (ig.input.state('down'))
					{					
						this._handle = null;
						this.pos.y++;
					}

					break;
				}
				case this.STATE.PLATFORM:
				{
					if (this._platform)
					{
						this.pos.x += this._platform.x_diff;

						if (this.pos.y < this._platform.pos.y - this.size.y)
							this.pos.y = this._platform.pos.y - this.size.y;

						this._platform = null;
					}

					this.update_walk_run();
					this.update_jump();
					this.update_shooting();
					this.update_ducking();

					break;
				}
				case this.STATE.KILLED:
				{
					break;
				}
				default:
				{
					break;
				}
			}

			this.parent();

			if (this.state != this.STATE.KILLED)
			{
				if (ig.input.pressed('weapon1'))
				{
					_player_data.selected_weapon = 0;
				}
				else if (ig.input.pressed('weapon2'))
				{
					_player_data.selected_weapon = 1;
				}

				if (this.vel.x == 0)
					this.currentAnim = this.anims.idle;
				else
				{
					if (this.state == this.STATE.RUNNING)
						this.currentAnim = this.anims.run;
					else
					{
						if (_player_data.learned >= this.LEARNED.WALKING)
							this.currentAnim = this.anims.walk;
						else
							this.currentAnim = this.anims.slow;
					}
				}

			//	if (!this.standing)
			//		this.currentAnim = this.anims.jump;

				if (!this.standing_on_entity && !this.standing)
					this.currentAnim = this.anims.jump;

				this.standing_on_entity = false;

				if (this.state == this.STATE.PLATFORM && this.state != this.STATE.SHOOTING)
					this.currentAnim = this.anims.idle;

				if (this.state == this.STATE.SHOOTING)
					this.currentAnim = this.anims.shoot;

				if (this._is_on_ladder)
				{
					this._is_on_ladder = false;
					this.currentAnim = this.anims.ladder;

					if (this._ladder_down)
						this.pos.y++;
				}

				if (this.state == this.STATE.DUCKING)
					this.currentAnim = this.anims.ducking;

				if (this.state == this.STATE.SLIDING)
					this.currentAnim = this.anims.sliding;

				if (this.state == this.STATE.HANDLE)
				{
					this.currentAnim = this.anims.handle;
					
					if (this._handle == null)
					{
						this.state = this.STATE.IDLE;
					}
					else
					{
						this.pos.x = this._handle.pos.x+1;
						this.pos.y = this._handle.pos.y+4;
					}
				}

				if (this.vel.x < 0)
					this.dir = -1;
				else if (this.vel.x > 0)
					this.dir = 1;

				if (this.dir < 0)
					this.currentAnim.flip.x = true;
				else if (this.dir > 0)
					this.currentAnim.flip.x = false;
			}
			else
			{
				this._pool_manager_blood.spawn(this.pos.x+3*Math.random(), this.pos.y+6+3*Math.random());

				if (ig.input.pressed('shoot'))
				{
					if (this.last_checkpoint)
					{
						this.state = this.STATE.IDLE;
						this.currentAnim = this.anims.idle;
						this.collides = ig.Entity.COLLIDES.ACTIVE;

						this.pos.x = this.last_checkpoint.x;
						this.pos.y = this.last_checkpoint.y;
					
					}
					else if (this.level_checkpoint)
					{
						this.state = this.STATE.IDLE;
						this.currentAnim = this.anims.idle;
						this.collides = ig.Entity.COLLIDES.ACTIVE;

						this.pos.x = this.level_checkpoint.x;
						this.pos.y = this.level_checkpoint.y;
					}
					else
					{
						ig.system.setGame(MenuState);
					}
				}
				else if (ig.input.pressed('skills'))
				{
					if (this.level_checkpoint)
					{
						this.state = this.STATE.IDLE;
						this.currentAnim = this.anims.idle;
						this.collides = ig.Entity.COLLIDES.ACTIVE;

						this.pos.x = this.level_checkpoint.x;
						this.pos.y = this.level_checkpoint.y;
					}
				}
			}

			if (this.pos.x < 0)
				this.pos.x = 0;
			else if (this.pos.x >= ig.game.backgroundMaps[1].width * ig.game.backgroundMaps[1].tilesize - this.size.x)
				this.pos.x = ig.game.backgroundMaps[1].width * ig.game.backgroundMaps[1].tilesize - this.size.x;

			if (this.pos.y >= ig.game.backgroundMaps[1].height * ig.game.backgroundMaps[1].tilesize - this.size.y)
			{
				this.kill();
				this.pos.y = ig.game.backgroundMaps[1].height * ig.game.backgroundMaps[1].tilesize - this.size.y;
			}
			
			if (this.boss && this.boss == 1)
			{
				if (this._boss_level_pan_timer.delta() < 0)
				{
					ig.game.screen.x = (-1) * this._boss_level_pan_timer.delta().map(5, 0, 300, 0);
					ig.game.screen.y = (-1 * this._boss_level_pan_timer.delta()).map(5, 0, 8, 120)+110;
	//				ig.game.screen.y = ig.system.height*0.5 + 92;

	//				ig.game.screen.x = 160;
	//				ig.game.screen.y = ig.system.height*0.5 + 110;
				}
				else
				{
					ig.game.screen.x = this.pos.x - 16;
					ig.game.screen.y = (this.pos.y + this.size.y) - ig.system.height*0.5 - 14;
				}
			}
			else
			{
				ig.game.screen.x = this.pos.x - ig.system.width*0.5;
				ig.game.screen.y = (this.pos.y + this.size.y) - ig.system.height*0.5 - 14;
			}

			if (this._look_down)
				ig.game.screen.y += 32;
			this._look_down = false;

			if (ig.game.screen.x < 1)
				ig.game.screen.x = 1;
			else if (ig.game.screen.x + ig.system.width > ig.game.backgroundMaps[1].width * ig.game.backgroundMaps[1].tilesize)
				ig.game.screen.x = ig.game.backgroundMaps[1].width * ig.game.backgroundMaps[1].tilesize - ig.system.width;

			if (ig.game.screen.y < 1)
				ig.game.screen.y = 1;
			else if (ig.game.screen.y + ig.system.height > ig.game.backgroundMaps[1].height * ig.game.backgroundMaps[1].tilesize)
				ig.game.screen.y = ig.game.backgroundMaps[1].height * ig.game.backgroundMaps[1].tilesize - ig.system.height;
		},

		on_ladder: function()
		{
			if (this.state != this.STATE.KILLED)
				this.state = this.STATE.LADDER;
		},

		on_handle: function(handle)
		{
			if (this.state != this.STATE.KILLED)
			{
				this.state = this.STATE.HANDLE;
				this._handle = handle;
			}
		},

		on_platform: function(platform)
		{
			if (this.state != this.STATE.KILLED)
			{
				this.state = this.STATE.PLATFORM;
				this._platform = platform;
			}
		},

		add_coin: function()
		{
			if (this.state != this.STATE.KILLED)
			{
				_player_data.coins++;
				return true;
			}

			return false;
		},

		add_blue_coin: function()
		{
			if (this.state != this.STATE.KILLED)
			{
				_player_data.blue_coins++;
				return true;
			}

			return false;
		},

		add_brain: function()
		{
			if (this.state != this.STATE.KILLED)
			{
				_player_data.learned++;
				return true;
			}

			return false;
		},

		add_ammo: function()
		{
			if (this.state != this.STATE.KILLED)
			{
				_player_data.stats_ammo_collected++;
				_player_data.bullets += 5;
				return true;
			}

			return false;
		},

		add_laser_ammo: function()
		{
			if (this.state != this.STATE.KILLED)
			{
				_player_data.stats_ammo_collected++;
				_player_data.laser_ammo += 2;
				return true;
			}

			return false;
		},

		kill: function()
		{
			if (this.state != this.STATE.KILLED)
			{
				_player_data.stats_killed++;
				this.state = this.STATE.KILLED;
				this.currentAnim = this.anims.killed;
				this.collides = ig.Entity.COLLIDES.NEVER;
				this.vel.x = 0;
			}
		},

		checkpoint: function(e)
		{
			this.last_checkpoint = {x: e.pos.x, y: e.pos.y };
		},

		collideWith: function(other, axis)
		{
			if (other && axis == 'y')
				this.standing_on_entity = true;
		},
	});
});