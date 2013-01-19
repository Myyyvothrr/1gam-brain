ig.module
(
	'game.entities.blood'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntityBlood = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/blood.png', 1, 1),
		size: { x: 1, y: 1 },
		offset: { x: 0, y: 0 },
		zIndex: 110,

		timer: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0 + 8 * Math.random()]);

			bounciness: 0.3 + 0.6 * Math.random();

			this.vel.x = -20 + 40 * Math.random();		
			this.vel.y = -40 + 80 * Math.random();
			this.accel.x = -60 + 120 * Math.random();			
			this.accel.y = -40 + 80 * Math.random();

			this.timer = new ig.Timer(0.1 + 1 * Math.random());
		},

		update: function()
		{
			this.parent();

			if (this.timer.delta() > 0)
				this.kill();
		},

		handleMovementTrace: function(res)
		{
		    if(res.collision.y)
		    {
		    	this.vel.x = 0;
		    	this.accel.x = 0;
			}

			this.parent(res);
		},
	});

	EntityAlienBlood = EntityBlood.extend(
	{
		animSheet: new ig.AnimationSheet('media/alien_blood.png', 1, 1),
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);
		},
	});
});