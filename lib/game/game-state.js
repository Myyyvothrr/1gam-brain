ig.module
( 
	'game.game-state' 
)
.requires
(
	'impact.game',
	'game.levels.0',
	'game.levels.1',
	'game.levels.2',
	'game.levels.3',
	'game.levels.4',
	'game.levels.5',
	'game.levels.6',
	'game.levels.7',
	'game.levels.8',
	'game.levels.9',
	'game.levels.10',
	'game.levels.11',
	'game.pool-manager',
	'game.entities.player'
)
.defines(function()
{
	GameState = ig.Game.extend(
	{
		gravity: 160,
		sortBy: ig.Game.SORT.Z_INDEX,
		autoSort: true,

		skills_imgs:
		[
			new ig.Image('media/skills_0.png'),
			new ig.Image('media/skills_1.png'),
			new ig.Image('media/skills_2.png'),
			new ig.Image('media/skills_3.png'),
			new ig.Image('media/skills_4.png'),
			new ig.Image('media/skills_5.png'),
		],
		show_skills: false,

		gui_coins_img: new ig.Image('media/coin.png'),
		gui_ammo_img: new ig.Image('media/ammo.png'),

		font: new ig.Font('media/04b03.font.png'),

		overlay_img: new ig.Image('media/overlay1.png'),

		loading_img: new ig.Image('media/loading.png'),
		loading_started: false,

//		difficulty: 0,

		player: null,

		global_data:
		{
			brains: [],
			ammo: [],
			coins: [],
		},

		text: 0,

		time_timer: null,

		POOL_OBJECTS_MAX: 512,
		_pool_manager: [ ],

		get_pool_manager: function(type)
		{
			for (var i = 0, l = this._pool_manager.length; i < l; ++i)
				if (this._pool_manager[i]._type == type)
					return this._pool_manager[i];

			return this._pool_manager[this._pool_manager.push(new PoolManager(type, this.POOL_OBJECTS_MAX))-1];
		},

		init: function()
		{
			ig.music.play('game1');

			_player_data_reset();

//			this.difficulty = difficulty;
			
			if (!this.time_timer)
				this.time_timer = new ig.Timer();

			this.time_timer.set(0);

			this.loadLevel(Level0);
		},

		loadLevelDeferred: function(data)
		{
			this.loading_started = true;

			this._pool_manager.length = 0;

			this.parent(data);
		},

		draw: function()
		{
			if (this.loading_started)
			{
				this.loading_img.draw(0, 0);
			}
			else if (this.show_skills)
			{
				this.skills_imgs[Math.min(5, _player_data.learned)].draw(0, 0);

				this.gui_coins_img.draw(2, 64);
				this.font.draw("x" + _player_data.coins, 11, 66, ig.Font.ALIGN.LEFT);
				this.gui_ammo_img.draw(32, 66);
				this.font.draw("x" + _player_data.bullets, 38, 66, ig.Font.ALIGN.LEFT);
			}
			else
			{
				this.parent();

				if (this.player.state != this.player.STATE.KILLED)
				{
					if (_player_data.learned < 1)
						this.overlay_img.draw(0, 0);

					if (this.text)
					{
						this.font.draw(this.text, 50, 8, ig.Font.ALIGN.CENTER);
						this.text = 0;
					}
				}
				else
				{
//					if (ig.game.difficulty < 1)
//						this.font.draw('GAME OVER\n[SPACE] to try again', 50, 8, ig.Font.ALIGN.CENTER);
//					else
						this.font.draw('GAME OVER\n[SPACE] to checkpoint\n[ESC] to level start', 50, 8, ig.Font.ALIGN.CENTER);
				}
			}
		},

		update: function()
		{
			if (this.player.state != this.player.STATE.KILLED && ig.input.pressed('skills'))
				this.show_skills = !this.show_skills;

			if (!this.show_skills)
				this.parent();

			_player_data.stats_time_played = (this.time_timer.delta() / 60).floor();
		},

		show_text: function(t)
		{
			this.text = t;
		},
	});
});