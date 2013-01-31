ig.module
(
	'game.entities.button'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityButton = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/button.png', 8, 10),
		size: { x: 8, y: 6 },
		offset: { x: 0, y: 4 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 13,

		duration_opening: 2,
		duration_open: 10,
		duration_closing: 5,

		button_sound: new ig.Sound('media/button.*'),

		timer: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('down', 1, [1]);

			this.timer = new ig.Timer(0);
		},

		update: function()
		{
			this.parent();

			this.currentAnim = this.anims.idle;	
		},

		check: function(other)
		{
			this.currentAnim = this.anims.down;
			
			if (this.timer.delta() > 0)
			{
				this.button_sound.play();
				this.timer.set(5);
			}

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
			}		
		},

		kill: function()
		{
		}
	});
});