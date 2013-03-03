ig.module
(
	'game.entities.alien-lair-trigger'
)
.requires
(
	'impact.entity',
	'game.entities.alien-lair'
)
.defines(function()
{
	EntityAlienLairTrigger = ig.Entity.extend(
	{
		_wmBoxColor: 'rgba(10, 100, 30, 75)',
		_wmDrawBox: true,
		_wmScalable: true,

		size: { x: 8, y: 8},
		gravityFactor: 0,
		checkAgainst: ig.Entity.TYPE.A,

		num: 2,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				for(var t in this.target)
				{
					var ent = ig.game.getEntityByName(this.target[t]);
					
					if(ent && ent instanceof EntityAlienLair)
						ent.spawn_aliens(this.num);
				}

				this.kill();
			}
		},
	});
});