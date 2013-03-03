ig.module
(
	'game.entities.switch'
)
.requires
(
	'impact.entity',
	'game.entities.gate',
	'game.entities.gate2',
	'game.entities.gate3'
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

		zIndex: 11,

		duration_opening: 2,
		duration_open: 10,
		duration_closing: 5,

		switch_sound: new ig.Sound('media/switch.*'),
		
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
			if (this.currentAnim != this.anims.pressed)
				this.switch_sound.play();

			this.currentAnim = this.anims.pressed;
			
			for(var t in this.target)
			{
				var ent = ig.game.getEntityByName(this.target[t]);
				
				if(ent && ent instanceof EntityGate2)
				{
					ent.open(this.duration_opening, this.duration_open, this.duration_closing);
				}
				else if(ent && ent instanceof EntityGate)
				{
					ent.open();
				}
				else if(ent && ent instanceof EntityGate3)
				{
					ent.open();
				}
			}
		},

		kill: function()
		{
		}
	});
});