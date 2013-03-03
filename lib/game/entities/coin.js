ig.module
(
	'game.entities.coin'
)
.requires
(
	'impact.entity',
	'game.entities.pooled'
)
.defines(function()
{
	CoinParticle = EntityPooled.extend(
	{
		animSheet: new ig.AnimationSheet('media/particles.png', 1, 1),
		size: { x: 1, y: 1 },
		offset: { x: 0, y: 0 },
		collides: ig.Entity.COLLIDES.NEVER,
		zIndex: 27,
		gravityFactor: -1,

		timer: null,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0+Math.random()*2]);

			this.vel.x = 0;		
			this.vel.y = -10 + -60 * Math.random();
			this.accel.x = 0;			
			this.accel.y = -10 + -40 * Math.random();

			if (!this.timer)
				this.timer = new ig.Timer();
			
			this.timer.set(0.1 + 0.2 * Math.random());
		},

		update: function()
		{
			if (this.destroyed)
				return;

			this.parent();

			if (this.timer.delta() > 0)
				this.kill();
		},
	});

	EntityCoin = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/coin.png', 8, 8),
		size: { x: 8, y: 8},
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		pickup_sound: new ig.Sound('media/coin.*'),

		zIndex: 27,

		coin_id: -1,

		_pool_manager: null,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			if (ig.game.global_data && ig.game.global_data.coins[this.coin_id] == true)
				ig.game.removeEntity(this);

			this.addAnim('idle', 1, [0]);

			if (ig.game.get_pool_manager)
				this._pool_manager = ig.game.get_pool_manager(CoinParticle);
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				if (other.add_coin())
				{
					this.pickup_sound.play();
					ig.game.removeEntity(this);
					ig.game.global_data.coins[this.coin_id] = true;
					this._pool_manager.spawn(this.pos.x+4, this.pos.y+4);
				}
			}
		},

		kill: function()
		{
		}
	});
});