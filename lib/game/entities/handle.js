ig.module
(
	'game.entities.handle'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityHandle = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/handle.png', 8, 4),
		size: { x: 8, y: 6 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 15,
		
		duration_opening: 2,
		duration_open: 10,
		duration_closing: 5,

		handle_sound: new ig.Sound('media/handle.*'),

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
			if (other instanceof EntityPlayer)
			{
				other.on_handle(this);

				if (this.timer.delta() > 0)
				{
					this.handle_sound.play();
					this.timer.set(5);
				}

				this.currentAnim = this.anims.down;
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