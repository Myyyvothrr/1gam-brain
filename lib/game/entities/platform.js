ig.module
(
	'game.entities.platform'
)
.requires
(
	'impact.entity',
	'game.entities.pooled'
)
.defines(function()
{
	PlatformParticles = EntityPooled.extend(
	{
		animSheet: new ig.AnimationSheet('media/platform_particles.png', 1, 1),
		size: { x: 1, y: 1 },
		offset: { x: 0, y: 0 },
		zIndex: 41,
		timer: null,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0 + 4 * Math.random()]);

			bounciness: 0.3 + 0.6 * Math.random();

			this.vel.x = -10 + 20 * Math.random();		
			this.vel.y = -10 + 20 * Math.random();
			this.accel.x = -30 + 60 * Math.random();			
			this.accel.y = -20 + 40 * Math.random();

			if (!this.timer)
				this.timer = new ig.Timer();

			this.timer.set(0.05 + 0.1 * Math.random());
		},

		update: function()
		{
			if (this.destroyed)
				return;

			this.parent();

			if (this.timer.delta() > 0)
				this.kill();
		},

		handleMovementTrace: function(res)
		{
			if (this.destroyed)
				return;

		    if(res.collision.x || res.collision.y)
		    {
		    	this.kill();
			}

			this.parent(res);
		},
	});

	PlatformParticles2 = PlatformParticles.extend(
	{
		zIndex: 19,
	});

	EntityPlatform = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/platform.png', 16, 8),
		size: { x: 14, y: 4 },
		offset: { x: 0, y: 2 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 20,
		
		start_pos: null,

		wait_timer: null,
		wait_time: 2,

		dest_pos: null,
		vertical: true,

		speed: 1,

		_back: false,

		x_diff: 0,

		_pool_manager: null,
		_pool_manager2: null,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.start_pos = this.pos;

			this.addAnim('idle', 1, [0]);

			this.vertical = (this.vertical == 1 ? true : false);

			if (ig.game.get_pool_manager)
			{
				this._pool_manager = ig.game.get_pool_manager(PlatformParticles);
				this._pool_manager2 = ig.game.get_pool_manager(PlatformParticles2);
			}

			this.wait_timer = new ig.Timer(this.wait_time);
		},

		update: function()
		{
			this.parent();

			this._pool_manager2.spawn(this.pos.x+(1 + 2 * Math.random()), this.pos.y+1);
			this._pool_manager.spawn(this.pos.x+(2 + 2 * Math.random()), this.pos.y+4);
			this._pool_manager.spawn(this.pos.x+(8 + 2 * Math.random()), this.pos.y+4);
			this._pool_manager.spawn(this.pos.x+(13 + 2 * Math.random()), this.pos.y+2);

			if (this.wait_timer.delta() < 0)
				return;

			if (this.vertical)
			{
				if (this.pos.y < (this._back ? this.start_pos.y : this.dest_pos))
					this.pos.y += this.speed;
				else if (this.pos.y > (this._back ? this.start_pos.y : this.dest_pos))
					this.pos.y -= this.speed;
			}
			else
			{
				if (this.pos.x < (this._back ? this.start_pos.x : this.dest_pos))
					this.pos.x += this.speed;
				else if (this.pos.x > (this._back ? this.start_pos.x : this.dest_pos))
					this.pos.x -= this.speed;
			}

			this.x_diff = this.pos.x - this.last.x;

			if (Math.abs(this.last.x - this.pos.x) < 0.00001 && Math.abs(this.last.y - this.pos.y) < 0.00001)
			{
				this.wait_timer.set(this.wait_time);
				this._back = !this._back;
			}
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				other.on_platform(this);
			}
		},

		kill: function()
		{
		}
	});
});