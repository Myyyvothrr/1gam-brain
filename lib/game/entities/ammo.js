ig.module
(
	'game.entities.ammo'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	AmmoParticle = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/particles.png', 1, 1),
		size: { x: 1, y: 1 },
		offset: { x: 0, y: 0 },
		collides: ig.Entity.COLLIDES.NEVER,
		zIndex: 27,
		gravityFactor: -1,

		timer: 0,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [3+Math.random()*1]);

			this.vel.x = 0;		
			this.vel.y = -10 + -60 * Math.random();
			this.accel.x = 0;			
			this.accel.y = -10 + -40 * Math.random();

			this.timer = new ig.Timer(0.1 + 0.2 * Math.random());
		},

		update: function()
		{
			this.parent();

			if (this.timer.delta() > 0)
				this.kill();
		},
	});

	EntityAmmo = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/ammo.png', 4, 4),
		size: { x: 4, y: 4},
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 25,
		pickup_sound: new ig.Sound('media/ammo.*'),

		ammo_id: -1,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			if (ig.game.global_data && ig.game.global_data.ammo[this.ammo_id] == true)
				ig.game.removeEntity(this);

			this.addAnim('idle', 1, [0]);
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				if (other.add_ammo())
				{
					this.pickup_sound.play();
					ig.game.removeEntity(this);
					ig.game.global_data.ammo[this.ammo_id] = true;
					ig.game.spawnEntity(AmmoParticle, this.pos.x+2, this.pos.y+2);
				}
			}
		},

		kill: function()
		{
		}
	});
});