ig.module(
	'game.entities.bounceable'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBounceable = ig.Entity.extend({
    
		type: ig.Entity.TYPE.NONE, // Player friendly group
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NEVER,

		spriteScaleX: 1,
		spriteScaleY: 1,
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		},

		squash: function(amount, time, bindTo){
			if(!time){
				time = 0.3;
			}

			if(!bindTo){
				bindTo = ig.game;
			}
			TweenMax.killTweensOf(this);
			this.spriteScaleY = 1 - amount;
			TweenMax.to(this, time, {spriteScaleY: 1, ease:Elastic.easeInOut});
			this.spriteScaleX = 1 + amount;
			if(this.onComplete){
				TweenMax.to(this, time, {spriteScaleX: 1, ease:Elastic.easeInOut, onComplete: this.onComplete.bind(bindTo)});
			} else {
				TweenMax.to(this, time, {spriteScaleX: 1, ease:Elastic.easeInOut});
			}
		},

		dip: function(amount, time){
			this.offset.y = amount;
			TweenMax.to(this.offset, time, {y: 0});
		},

		stretch: function(amount, time, bindTo){
			if(!time){
				time = 0.3;
			}

			if(!bindTo){
				bindTo = ig.game;
			}
			TweenMax.killTweensOf(this);
			this.spriteScaleY = 1 + amount;
			TweenMax.to(this, time, {spriteScaleY: 1, ease:Elastic.easeInOut});
			this.spriteScaleX = 1 - amount;
			if(this.onComplete){
				TweenMax.to(this, time, {spriteScaleX: 1, ease:Elastic.easeInOut, onComplete: this.onComplete.bind(bindTo)});
			} else {
				TweenMax.to(this, time, {spriteScaleX: 1, ease:Elastic.easeInOut});
			}
		},
    
		update: function() {
			this.parent();
		},

		draw: function(){
			this.currentAnim.scaleX = this.spriteScaleX;
			this.currentAnim.scaleY = this.spriteScaleY;
			this.parent();
		}
	});
});
