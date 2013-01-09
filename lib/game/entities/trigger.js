ig.module
(
	'game.entities.trigger'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityTrigger = ig.Entity.extend(
	{
		size: { x: 8, y: 8},
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		_wmScalable: true,
		_wmDrawBox: 'rgba(255, 0, 255, 0.5)',
		
		check: function(other)
		{
			if (other instanceof EntityPlayer)
				ig.system.setGame(FinishedState);
		},
	});
});