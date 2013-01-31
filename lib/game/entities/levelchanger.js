ig.module
(
	'game.entities.levelchanger'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityLevelchanger = ig.Entity.extend(
	{
		size: { x: 8, y: 8},
		gravityFactor: 0,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,

		_wmScalable: true,
		_wmDrawBox: 'rgba(128, 0, 128, 0.5)',

		level: 0,

		to_x: null,
		to_y: null,
		to_dir: 1,
		
		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				ig.game.loadLevelDeferred(ig.global['Level' + this.level]);

				if (this.to_x != null && this.to_y != null)
					_player_data.to = { x: this.to_x, y: this.to_y, dir: this.to_dir };
			}
		},

		draw: function()
		{

		},

		update: function()
		{

		},

		kill: function()
		{
		}
	});
});