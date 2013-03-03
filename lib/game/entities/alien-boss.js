ig.module
(
	'game.entities.alien-boss'
)
.requires
(
	'impact.entity',
	'game.entities.alien1'
)
.defines(function()
{
	EntityAlienBoss = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/boss.png', 224, 192),
		size: { x: 224, y: 192 },
		offset: { x: 0, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 16,
		
		_pool_manager: null,

		timer: 0,

		num: 0,

		hitpoints: 10,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('open', 1, [1, 0], true);

			if (ig.game.get_pool_manager)
				this._pool_manager = ig.game.get_pool_manager(EntityAlienBlood);

			this.timer = new ig.Timer(6);

			if (ig.game && ig.game.boss_level_draw != 'undefined')
			{
				ig.game.boss_level_draw = true;
				ig.game.boss = this;
			}
		},

		update: function()
		{
			this.parent();

			if (this.timer.delta() > 0)
			{
				this.currentAnim = this.anims.open.rewind();

				this.num = 1 + Math.random() * 2;
				for (var i = 0; i < this.num; ++i)
					ig.game.spawnEntity(EntityAlien1, this.pos.x+14 + 8 * Math.random(), this.pos.y+156, { boss: true });

				this.timer.set(8 + Math.random() * 5);
			}
		},

		hit: function()
		{
			--this.hitpoints;
			if (this.hitpoints <= 0)
				this.kill();

			for (var i = 0; i < 300+300*Math.random(); ++i)
				this._pool_manager.spawn(this.pos.x+this.size.x*Math.random(), this.pos.y+this.size.y*Math.random());
		},

		kill: function()
		{
			_player_data.stats_kills++;

			ig.system.setGame(FinishedState2);

			this.parent();
		},

		check: function(other)
		{
			if (other instanceof EntityPlayer)
				other.kill();
		},
	});
});