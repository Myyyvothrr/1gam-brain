ig.module
( 
	'game.main' 
)
.requires
(
	'impact.game',
//	'impact.debug.debug',
	'game.entities.player',
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
	'game.levels.11'
)
.defines(function()
{
	//VERSION = 'One Game A Month 1: Where The Fuck Is My Brain? v0.5.0';
	VERSION = 'v1.0';

	_difficulty = 0;
			
	_player_data =
	{
		coins: 0,
		bullets: 0,
		learned: 0,
		to: null,

		stats_shots_fired: 0,
		stats_kills: 0,
		stats_killed: 0,
		stats_ammo_collected: 0,
		stats_time_played: 0,
	};

	_player_data_reset = function()
	{
		_player_data.coins = 0;
		_player_data.bullets = 0;
		_player_data.learned = 0;
		_player_data.to = null;

		_player_data.stats_shots_fired = 0;
		_player_data.stats_kills = 0;
		_player_data.stats_killed = 0;
		_player_data.stats_ammo_collected = 0;
		_player_data.stats_time_played = 0;
	};

	OGAM1 = ig.Game.extend(
	{
		ogam_img: new ig.Image('media/ogam.png'),

//		default_music: new ig.Sound('media/ogam1.ogg'),

		timer: 0,

		init: function()
		{
//			ig.music.add(this.default_music);
//			ig.music.volume = 0.7;
//			ig.music.play();

			ig.input.bind(ig.KEY.A, 'left');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');

			ig.input.bind(ig.KEY.D, 'right');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

			ig.input.bind(ig.KEY.S, 'down');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');

			ig.input.bind(ig.KEY.W, 'jump');
			ig.input.bind(ig.KEY.UP_ARROW, 'jump');

			ig.input.bind(ig.KEY.SPACE, 'shoot');
			ig.input.bind(ig.KEY.ENTER, 'shoot');

			ig.input.bind(ig.KEY.SHIFT, 'run');

			ig.input.bind(ig.KEY.ESC, 'skills');

			this.timer = new ig.Timer(3);
		},

		update: function()
		{
			this.parent();
			if (this.timer.delta() > 0)
				ig.system.setGame(MenuState);
		},

		draw: function()
		{
			this.parent();
			this.ogam_img.draw(0, 0);
		}
	});

	MenuState = ig.Game.extend(
	{
		title_img: new ig.Image('media/title_ingame.png'),
		font: new ig.Font('media/04b03.font.png'),

		cursor: 0,

		select_difficulty: false,
		difficulty: 0,

		init: function()
		{
		},

		update: function()
		{
			if (ig.input.pressed('shoot'))
			{
				if (!this.select_difficulty)
				{	
					switch (this.cursor)
					{
						case 0: this.select_difficulty = true; break;
						case 1: ig.system.setGame(HelpState); break;
						case 2: ig.system.setGame(CreditsState); break;
					}
				}
				else
				{
					difficulty = this.difficulty;
					ig.system.setGame(GameState); 
				}
			}
			
			if (!this.select_difficulty)
			{
				if (ig.input.pressed('down'))
					this.cursor = (this.cursor+1) % 3;
				else if (ig.input.pressed('jump'))
				{
					--this.cursor;
					if (this.cursor < 0)
						this.cursor = 2;
				}
			}
			else
			{
				if (ig.input.pressed('down') || ig.input.pressed('jump'))
					this.difficulty == 0 ? this.difficulty = 1 : this.difficulty = 0;
			}
		},

		draw: function()
		{
			this.parent();
			this.title_img.draw(0, 0);
			
			if (!this.select_difficulty)
			{
				this.font.draw((this.cursor == 0) ? '-> Start' : 'Start', 98, 52, ig.Font.ALIGN.RIGHT);
				this.font.draw((this.cursor == 1) ? '-> Help' : 'Help', 98, 60, ig.Font.ALIGN.RIGHT);
				this.font.draw((this.cursor == 2) ? '-> Credits' : 'Credits', 98, 68, ig.Font.ALIGN.RIGHT);
			}
			else
			{
				this.font.draw((this.difficulty == 0) ? '-> Hard' : 'Hard', 98, 52, ig.Font.ALIGN.RIGHT);
				this.font.draw((this.difficulty == 1) ? '-> Easy' : 'Easy', 98, 60, ig.Font.ALIGN.RIGHT);
				this.font.draw((this.difficulty == 0) ? 'No checkpoints' : 'Helping checkpoints', 98, 68, ig.Font.ALIGN.RIGHT);
			}
		}
	});

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

		font: new ig.Font('media/04b03.font.png'),

		overlay_img: new ig.Image('media/overlay1.png'),

		difficulty: 0,

		player: null,

		global_data:
		{
			brains: [],
			ammo: [],
			coins: [],
		},

		text: 0,

		time_timer: 0,

		init: function()
		{
			_player_data_reset();

			this.difficulty = difficulty;

			this.time_timer = new ig.Timer();

			this.loadLevel(Level0);
		},

		draw: function()
		{
			if (this.show_skills)
			{
				this.skills_imgs[Math.min(5, _player_data.learned)].draw(0, 0);
			}
			else
			{
				this.parent();

				if (this.player.state != this.player.STATE.KILLED)
				{
					this.font.draw('C' + _player_data.coins, 1, 1, ig.Font.ALIGN.LEFT);
					this.font.draw('A' + _player_data.bullets, 99, 1, ig.Font.ALIGN.RIGHT);

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
					if (ig.game.difficulty < 1)
						this.font.draw('GAME OVER\n[SPACE] to try again', 50, 8, ig.Font.ALIGN.CENTER);
					else
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

	InfoState = ig.Game.extend(
	{
		bg_img: new ig.Image('media/bg1.png'),
		font: new ig.Font('media/04b03.font.png'),

		update: function()
		{
			if (ig.input.pressed('shoot'))
				ig.system.setGame(MenuState);
		},

		draw: function()
		{
			this.parent();
			this.bg_img.draw(0, 0);
		}
	});

	FinishedState = InfoState.extend(
	{			
		end_str: '"Hmmm...\nI can\'t see\nanything.\n\nBut I can hear\nthese aliens!\n\nThe teleporter must\nhave sent me\nto their ship."\n\n\nThank you\nfor playing!\n\nTo be\ncontinued!',
		end_str_height: 0,
		end_progress: 0,
		
		timer: 0,

		update: function()
		{
			this.parent();

			if (this.timer == 0)
			{
				this.end_str_height = this.font.heightForString(this.end_str)-56;
				this.timer = new ig.Timer(25);
			}

			this.end_progress = (-1*this.timer.delta()).map(0, 25, -this.end_str_height, 80);

			if (this.timer.delta() > 0)
				this.timer.pause();
		},

		draw: function()
		{
			this.parent();

			if (this.timer.delta() > 0)
				this.font.draw('Results:\n\nFound ' + _player_data.coins + ' / 100 coins\nPlayed ' + _player_data.stats_time_played + ' mins\nGot killed ' + _player_data.stats_killed + ' times\nFired ' + _player_data.stats_shots_fired + ' rounds\nKilled ' + _player_data.stats_kills + ' aliens\nFound ' + _player_data.stats_ammo_collected + ' ammo packs', ig.system.width*0.5, 4, ig.Font.ALIGN.CENTER);
			else
				this.font.draw(this.end_str, ig.system.width*0.5, this.end_progress, ig.Font.ALIGN.CENTER);
		},
	});

	HelpState = InfoState.extend(
	{			
		draw: function()
		{
			this.parent();
			
			this.font.draw('Collect your missing\nbrain parts to learn\nnew skills: ESC\nWalk: W+D/LEFT+RIGHT\nJump: W/UP\nRun: Hold SHIFT\nSlide: Run+S/DOWN\nShoot: SPACE', ig.system.width*0.5, 4, ig.Font.ALIGN.CENTER);
		},
	});

	CreditsState = InfoState.extend(
	{			
		credits_str: 'Where The Fuck\nIs My Brain?\n' + VERSION + '\n\nOne Game A Month\nJanuary Entry\n\nDaniel Baumartz\n\nonegameamonth.com/\nMyyyvothrr\n\nThank you:\n\nPhil B\nphilbam.de\n\nFelix Peters\n\nOGAM Google+\nCommunity\n\nspieleprogrammierer.de\n\nMade with:\n\nImpact\nPro Motion\nPhotoshop Elements\nsfxr\nGoldWave\nRenoise\nSublime Text\nBrain image:\ncommons.wikimedia.org/\nwiki/File:Human_\nbrain_NIH.png\n\n\n"It might sound\ncrazy optimistic, but\nyou CAN do it."\nonegameamonth.com\n\n\n\n\n\nMyyyvothrr.de',
		credits_str_height: 0,
		credits_progress: 0,

		timer: 0,

		update: function()
		{
			this.parent();

			if (this.timer == 0)
			{
				this.credits_str_height = this.font.heightForString(this.credits_str)-48;
				this.timer = new ig.Timer(30);
			}

			this.credits_progress = (-1*this.timer.delta()).map(0, 30, -this.credits_str_height, 80);

			if (this.timer.delta() > 0)
				this.timer.pause();
		},

		draw: function()
		{
			this.parent();
			
			this.font.draw(this.credits_str, ig.system.width*0.5, this.credits_progress, ig.Font.ALIGN.CENTER);
		},
	});

	ig.log(VERSION);

	if(ig.ua.mobile)
	{
	    ig.Sound.enabled = false;
	}

	ig.Sound.use = [ig.Sound.FORMAT.OGG];

	ig.main('#canvas', OGAM1, 60, 100, 75, 8);
//	ig.main('#canvas', OGAM1, 60, 100, 75, 15); //-> passt für 1920x1280 / große auflösungen ?
});