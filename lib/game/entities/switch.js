ig.module
(
	'game.entities.switch'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntitySwitch = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/switch.png', 8, 8),
		size: { x: 8, y: 8},
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 5,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('pressed', 1, [1]);
		},

		update: function()
		{
			this.parent();
		},

		check: function(other)
		{
			for(var t in this.target)
			{
				var ent = ig.game.getEntityByName(this.target[t]);
				
				if(ent && ent instanceof EntityGate)
				{
					ent.open();
					this.currentAnim = this.anims.pressed;
				}
			}
		},
	});
});