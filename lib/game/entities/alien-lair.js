ig.module
(
	'game.entities.alien-lair'
)
.requires
(
	'impact.entity',
	'game.entities.alien1'
)
.defines(function()
{
	EntityAlienLair = ig.Entity.extend(
	{
		_wmBoxColor: 'rgba(10, 120, 30, 75)',
		_wmDrawBox: true,
		_wmScalable: true,

		size: { x: 8, y: 8},
		gravityFactor: 0,

		dir: 1,
		timer: null,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

		},

		spawn_aliens: function(num)
		{
			for (var i = 0; i < num; ++i)
				ig.game.spawnEntity(EntityAlien1, this.pos.x + Math.random()*this.size.x, this.pos.y);

			this.kill();
		},
	});
});