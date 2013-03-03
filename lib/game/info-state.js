ig.module
( 
	'game.info-state' 
)
.requires
(
	'impact.game'
)
.defines(function()
{
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
		
		timer: null,

		init: function()
		{
			this.end_str_height = this.font.heightForString(this.end_str)-56;
			this.timer = new ig.Timer(25);
		},

		update: function()
		{
			this.parent();

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

	FinishedState2 = InfoState.extend(
	{			
		end_str: '"YES!\n\nI killed this\nfucking alien.\n\nI think\nthat\'s it..."\n\n\nThank you\nfor playing!',
		end_str_height: 0,
		end_progress: 0,
		
		timer: null,

		init: function()
		{
			this.end_str_height = this.font.heightForString(this.end_str)-56;
			this.timer = new ig.Timer(25);
		},

		update: function()
		{
			this.parent();

			this.end_progress = (-1*this.timer.delta()).map(0, 25, -this.end_str_height, 80);

			if (this.timer.delta() > 0)
				this.timer.pause();
		},

		draw: function()
		{
			this.parent();

			if (this.timer.delta() > 0)
				this.font.draw('Results:\n\nFound ' + _player_data.blue_coins + ' / 13 coins\nPlayed ' + _player_data.stats_time_played + ' mins\nGot killed ' + _player_data.stats_killed + ' times\nFired ' + _player_data.stats_shots_fired + ' rounds\nKilled ' + _player_data.stats_kills + ' aliens\nFound ' + _player_data.stats_ammo_collected + ' ammo packs', ig.system.width*0.5, 4, ig.Font.ALIGN.CENTER);
			else
				this.font.draw(this.end_str, ig.system.width*0.5, this.end_progress, ig.Font.ALIGN.CENTER);
		},
	});

	HelpState = InfoState.extend(
	{			
		draw: function()
		{
			this.parent();
			
			this.font.draw('Infos: ESC\nWalk: W+D/LEFT+RIGHT\nJump: W/UP\nRun: Hold SHIFT\nSlide: Run+S/DOWN\nShoot: SPACE\nGun: 1\nLaser Rifle: 2', ig.system.width*0.5, 4, ig.Font.ALIGN.CENTER);
		},
	});

	CreditsState = InfoState.extend(
	{			
		credits_str: 'Where The Fuck\nIs My Brain?\n' + VERSION + '\n\nOne Game A Month\nJanuary Entry\n... + February\n\nDaniel Baumartz\n\nonegameamonth.com/\nMyyyvothrr\n\nThank you:\n\nPhil B\nphilbam.de\n\nFelix Peters\n\nOGAM Google+\nCommunity\n\nspieleprogrammierer.de\n\nMade with:\n\nImpact\nPro Motion\nPhotoshop Elements\nsfxr\nGoldWave\nRenoise\nSublime Text\nBrain image:\ncommons.wikimedia.org/\nwiki/File:Human_\nbrain_NIH.png\n\n\n"It might sound\ncrazy optimistic, but\nyou CAN do it."\nonegameamonth.com\n\n\n\n\n\nMyyyvothrr.de',
		credits_str_height: 0,
		credits_progress: 0,

		timer: null,

		init: function()
		{
			this.credits_str_height = this.font.heightForString(this.credits_str)-48;
			this.timer = new ig.Timer(30);
		},

		update: function()
		{
			this.parent();

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
});