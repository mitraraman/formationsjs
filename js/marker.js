function Marker(x, y, mark) {
		this.x = x;
		this.y = y;
		this.isMark = mark;
		this.isHorz = (y === 0);
		console.log(x,y,mark,this.isHorz);
}

Marker.prototype.draw = function(stage) {
		var ctx = stage.context;

		ctx.beginPath();
      if (this.isMark) {
  				ctx.setLineDash([3,5])
					ctx.strokeStyle = "#444";
			} else {
  				ctx.setLineDash([1,2])
					ctx.strokeStyle = "#777";
			}

  	  ctx.moveTo(this.x,this.y);
		  if (this.isHorz === true) {
					ctx.lineTo(this.x,stage.canvas.height);
			} else {
					ctx.lineTo(stage.canvas.width, this.y);
			}
		ctx.closePath();
		ctx.stroke();

		ctx.beginPath();
		  if (this.isMark) {
					ctx.arc(this.x,this.y,7,0,2*Math.PI);
			}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
}
