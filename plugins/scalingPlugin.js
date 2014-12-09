// lib.plugins.scalingPlugin
ig.module('plugins.scalingPlugin')
    .requires('impact.image', 'impact.animation')
    .defines(
    function()
    {
        ig.Image.inject({drawTile:function(targetX, targetY, tile, tileWidth, tileHeight, flipX, flipY, spritescalex, spritescaley)
        {
            tileHeight = tileHeight ? tileHeight : tileWidth;
			
			if( !this.loaded || tileWidth > this.width || tileHeight > this.height ) { return; }
			
			var scale = ig.system.scale;
			var tileWidthScaled = Math.floor(tileWidth * scale);
			var tileHeightScaled = Math.floor(tileHeight * scale);
			
			var scaleX = flipX ? -1 : 1;
			var scaleY = flipY ? -1 : 1;
			
			if( flipX || flipY ) {
				ig.system.context.save();
				ig.system.context.scale( scaleX, scaleY );
			}
			var scaled = false;
			if((spritescalex !== undefined && spritescalex !== 1) || (spritescaley !== undefined && spritescaley !== 1)){
				scaled = true;
				if(spritescalex === undefined){
					spritescalex = 1;
				}
				if(spritescaley === undefined){
					spritescaley = 1;
				}
				ig.system.context.save();
				var xpos = ig.system.getDrawPos(targetX) * scaleX - (flipX ? tileWidthScaled : 0) + tileWidthScaled/2;
				var ypos = ig.system.getDrawPos(targetY) * scaleY - (flipY ? tileHeightScaled : 0) + tileHeightScaled/2;
				ig.system.context.translate( xpos - (xpos * spritescalex), ypos - (ypos * spritescaley));
				ig.system.context.scale( spritescalex, spritescaley);
			}
			ig.system.context.drawImage( 
				this.data, 
				( Math.floor(tile * tileWidth) % this.width ) * scale,
				( Math.floor(tile * tileWidth / this.width) * tileHeight ) * scale,
				tileWidthScaled,
				tileHeightScaled,
				ig.system.getDrawPos(targetX) * scaleX - (flipX ? tileWidthScaled : 0), 
				ig.system.getDrawPos(targetY) * scaleY - (flipY ? tileHeightScaled : 0),
				tileWidthScaled,
				tileHeightScaled
			);
			
			if( flipX || flipY ) {
				ig.system.context.restore();
			}

			if(scaled){
				ig.system.context.restore();
			}
			
			ig.Image.drawCount++;
        }/*,
        */
    }),
	ig.Animation.inject({draw:function(targetX, targetY)
        {
            if(!this.scaleX){
				this.scaleX = 1;
			}
			if(!this.scaleY){
				this.scaleY = 1;
			}
			var bbsize = Math.max(this.sheet.width, this.sheet.height);
			
			// On screen?
			if(
			   targetX > ig.system.width || targetY > ig.system.height ||
			   targetX + bbsize < 0 || targetY + bbsize < 0
			) {
				return;
			}
			
			if( this.alpha != 1) {
				ig.system.context.globalAlpha = this.alpha;
			}
			
			if( this.angle == 0 ) {		
				this.sheet.image.drawTile(
					targetX, targetY,
					this.tile, this.sheet.width, this.sheet.height,
					this.flip.x, this.flip.y,
					this.scaleX, this.scaleY
				);
			}
			else {
				ig.system.context.save();
				ig.system.context.translate(
					ig.system.getDrawPos(targetX + this.pivot.x),
					ig.system.getDrawPos(targetY + this.pivot.y)
				);
				ig.system.context.rotate( this.angle );
				this.sheet.image.drawTile(
					-this.pivot.x, -this.pivot.y,
					this.tile, this.sheet.width, this.sheet.height,
					this.flip.x, this.flip.y,
					this.scaleX, this.scaleY
				);
				ig.system.context.restore();
			}
			
			if( this.alpha != 1) {
				ig.system.context.globalAlpha = 1;
			}
		}
    });
});