ig.module
(
	'game.entities.coin2'
)
.requires
(
	'impact.entity',
	'game.entities.coin'
)
.defines(function()
{
	EntityCoin2 = EntityCoin.extend(
	{
		animSheet: new ig.AnimationSheet('media/coin2.png', 8, 8),
				
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				if (other.add_blue_coin())
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