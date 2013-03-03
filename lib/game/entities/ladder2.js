ig.module
(
	'game.entities.ladder2'
)
.requires
(
	'impact.entity',
	'game.entities.ladder'
)
.defines(function()
{
	EntityLadder2 = EntityLadder.extend(
	{
		animSheet: new ig.AnimationSheet('media/ladder2.png', 8, 8),
	});
});