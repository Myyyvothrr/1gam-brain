ig.module
( 
	'game.game-state-chapter2' 
)
.requires
(
	'game.game-state',

	'game.levels.alien0',
	'game.levels.alien1',
	'game.levels.alien2',
	'game.levels.alien3',
	'game.levels.alien4',
	'game.levels.alien5',
	'game.levels.alien6'
)
.defines(function()
{
	GameStateChapter2 = GameState.extend(
	{
		gui_laser_ammo_img: new ig.Image('media/laser_ammo.png'),
		gui_coins2_img: new ig.Image('media/coin2.png'),

		gui_bg_img: new ig.Image('media/bg2.png'),

		boss_level_draw: false,
		boss: null,

		init: function()
		{
			this.parent();

			ig.music.play('game2');

			_player_data.learned = 5;
			this.loadLevel(LevelAlien0);
		},

		draw: function()
		{
			if (this.loading_started)
			{
				this.loading_img.draw(0, 0);
			}
			else if (this.show_skills)
			{
				this.gui_bg_img.draw(0, 0);

				this.gui_coins2_img.draw(2, 2);
				this.font.draw("x" + _player_data.blue_coins + "/15 blue coins", 11, 4, ig.Font.ALIGN.LEFT);
				this.gui_ammo_img.draw(6, 15);
				this.font.draw("x" + _player_data.bullets + " bullets", 11, 14, ig.Font.ALIGN.LEFT);				
				this.gui_laser_ammo_img.draw(6, 27);
				this.font.draw("x" + _player_data.laser_ammo + " laser ammo", 11, 26, ig.Font.ALIGN.LEFT);

				if (_player_data.selected_weapon == 0)
					this.font.draw("Weapon: Gun\nThis is a gun. Simple.", 4, 40, ig.Font.ALIGN.LEFT);
				else if (_player_data.selected_weapon == 1)
					this.font.draw("Weapon: Laser Rifle\nI can kill more than\none alien with a shot\nand hurt the boss!", 4, 40, ig.Font.ALIGN.LEFT);

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

					if (this.boss_level_draw)
					{
						this.font.draw("Alien: " + this.boss.hitpoints, 98, 2, ig.Font.ALIGN.RIGHT);
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

	});
});