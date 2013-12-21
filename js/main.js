function Stage(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		//In case browser doesn't support dashed lines
		if (!this.context.setLineDash) {
				this.context.setLineDash = function() {}
		}

		this.markers = []
		this.dancers = []
}

Stage.prototype.draw = function() {
		var id1, id2;
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (id1 in this.markers) {
				this.markers[id1].draw(this);
		}

		for (id2 in this.dancers) {
				if(this.dancers[id2] === this._focus ||
					 this.dancers[id2] === this._selected) {
						continue;
				}
				this.dancers[id2].draw(this);
		}

		//always draw focus last
		this._focus && this._focus.draw(this);
		this._selected && this._selected.draw(this);
}

Stage.prototype.setMarkers = function(numHorz, numVert) {
		this.markers = [];
		var spaceHorz = this.canvas.width / (2*(numHorz+1));
		var spaceVert = this.canvas.height / (2*(numVert+1));
		for (var i = 1; i < 2*(numHorz+1); i++) {
				// if i even, then actual marker, else it's a mid
				var m = new Marker(spaceHorz*i, 0, (i % 2 === 0));

				this.markers.push(m);
		}
		for (var j = 1; j < 2*(numVert+1); j++) {
				// if j even, then actual marker, else it's a mid
				var m = new Marker(0, spaceVert*j, (j % 2 === 0));

				this.markers.push(m);
		}
}


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
