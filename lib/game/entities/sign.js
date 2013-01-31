ig.module
(
	'game.entities.sign'
)
.requires
(
	'impact.entity'
)
.defines(function()
{
	EntitySign = ig.Entity.extend(
	{
		animSheet: new ig.AnimationSheet('media/sign.png', 8, 8),
		size: { x: 16, y: 8 },
		offset: { x: -4, y: 0 },
		gravityFactor: 0,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,

		zIndex: 9,
		
		init: function(x, y, settings)
		{
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [(3 * Math.random()).floor()]);
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