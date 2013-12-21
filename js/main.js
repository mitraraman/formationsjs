function Stage(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		//In case browser doesn't support dashed lines
		if (!this.context.setLineDash) {
				this.context.setLineDash = function() {};
		}

		this.markers = [];
		this.dancerCount = 0;
		this.dancers = new DancersList(document.getElementById('dancers'));
}

Stage.prototype.draw = function() {
		var id1, id2;
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (id1 in this.markers) {
				this.markers[id1].draw(this);
		}

		for (id2 in this.dancers.array) {
				if(this.dancers.array[id2] === this.dancers.active) {
						continue;
				}
				this.dancers.array[id2].draw(this);
		}

		//always draw active dancer last
		this.dancers.active && this.dancers.active.draw(this);
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

Stage.prototype.addDancer = function(name, gender, color) {
		this.dancerCount++;
		var self = this;
		var dancer = new Dancer(this.dancerCount, name, gender, color);
		dancer.element.click(function() {
				self.dancers.active &&
						self.dancers.active.element.removeClass("active");
				dancer.element.addClass("active");
				self.dancers.active = dancer;
		});
		this.dancers.push(dancer);

}

function DancersList(el) {
		this.element = $(el);
		this.array = [];
		this.active = null;
}

DancersList.prototype.push = function (dancer) {
		this.array.push(dancer);
		this.element.append(dancer.element);
}

function Dancer(id, name, gender, color) {
		this.id = id;
		this.name = name;
		this.gender = gender;
		this.color = color;
		this.element = $('<a>' + id +". "+ name + '</a>')
				.addClass("dancer list-group-item");
}

Dancer.prototype.draw = function() {

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
