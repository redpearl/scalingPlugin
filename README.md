scalingPlugin
=============

A plugin that adds scaling to the animations in ImpactJS.

To install just put scalingPlugin into the folder 'plugins' in your impact project, and make sure to include the plugin under 'requires' in your main.js like this:

.requires(
	'impact.game',
	'plugins.scalingPlugin',

Now you should be able to scale animations by setting the scale.x and scale.y of your entities.

I've included my suggested bounceable entity that all my scalable entities inherit from, instead of from ig.Entity. It supports scaling and some nice utility functions like stretch(), squash() and dip().
For it to work you have to include TweenMax in your project, which can be downloaded from here: http://greensock.com/tweenmax
Stretch and Squash take two parameters, amount and duration, which determines how much you will stretch or squash the entity, and for how long the animation will last.
Dip() tweens the animation y-offset of your entity, which is very useful in conjunction with squash, as it squashes the entity from the middle point of the texture, so your entity can appear to float above the ground without 'dipping' it.

To see some real world examples of the use of this plugin, check out Collectic: http://krisjet.itch.io/collectic
The source of the game is available here: https://github.com/redpearl/Collectic