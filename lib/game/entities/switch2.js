ig.module
(
	'game.entities.switch2'
)
.requires
(
	'impact.entity',
	'game.entities.switch'
)
.defines(function()
{
	EntitySwitch2 = EntitySwitch.extend(
	{
		animSheet: new ig.AnimationSheet('media/switch-alien.png', 8, 8),
	});
});