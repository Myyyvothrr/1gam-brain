ig.module
(
	'game.entities.laser-ammo'
)
.requires
(
	'impact.entity',
	'game.entities.ammo'
)
.defines(function()
{
	EntityLaserAmmo = EntityAmmo.extend(
	{
		animSheet: new ig.AnimationSheet('media/laser_ammo.png', 4, 4),

		laser_ammo_id: -1,

		check: function(other)
		{
			if (other instanceof EntityPlayer)
			{
				if (other.add_laser_ammo())
				{
					this.pickup_sound.play();
					ig.game.removeEntity(this);
					ig.game.global_data.ammo[this.laser_ammo_id] = true;
					this._pool_manager.spawn(this.pos.x+2, this.pos.y+2);
				}
			}
		},

		kill: function()
		{
		}
	});
});