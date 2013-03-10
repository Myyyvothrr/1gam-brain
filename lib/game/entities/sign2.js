ig.module
(
	'game.entities.sign2'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntitySign2 = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/sign-alien.png', 8, 8),
		size: { x: 16, y: 8 },
		offset: { x: -4, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 9,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
		},

		check: function(other)
		{
			if (this.text && other instanceof EntityPlayer)
			{
				var temp = '';
				for(var t in this.text)
					temp += this.text[t] + '\n';
				
				ig.game.show_text(temp);
			}
		},

		kill: function()
		{
		}
	});
});