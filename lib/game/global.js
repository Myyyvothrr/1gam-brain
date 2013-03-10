ig.module
( 
	'game.global' 
)
.requires
(
)
.defines(function()
{
	//VERSION = 'One Game A Month 1: Where The Fuck Is My Brain? v0.5.0';
	VERSION = 'v2.2';

	_player_data =
	{
		coins: 0,
		blue_coins: 0,
		bullets: 0,
		learned: 0,
		to: null,

		selected_weapon: 0,
		laser_ammo: 0,

		stats_shots_fired: 0,
		stats_kills: 0,
		stats_killed: 0,
		stats_ammo_collected: 0,
		stats_time_played: 0,
	};

	_player_data_reset = function()
	{
		_player_data.coins = 0;
		_player_data.blue_coins = 0;
		_player_data.bullets = 0;
		_player_data.learned = 0;
		_player_data.to = null;

		_player_data.selected_weapon = 0;
		_player_data.laser_ammo = 0;

		_player_data.stats_shots_fired = 0;
		_player_data.stats_kills = 0;
		_player_data.stats_killed = 0;
		_player_data.stats_ammo_collected = 0;
		_player_data.stats_time_played = 0;
	};
});