function Stage(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		//In case browser doesn't support dashed lines
		if (!this.context.setLineDash) {
				this.context.setLineDash = function() {};
		}

		this.markers = [];
		this.markerHorzDist = 0;
		this.markerVertDist = 0;

		this.dancerCount = 0;
		this.dancers = new DancersList(document.getElementById('dancers'));

		var self = this;
		this._listeners = {
				mousemove: function() { self._onMouseMove.apply(self, arguments); },
				mousedown: function() { self._onMouseDown.apply(self, arguments); },
				mouseup: function() { self._onMouseUp.apply(self, arguments); },
				click: function() { self._onClick.apply(self, arguments); }
		};
		var type;
		for (type in this._listeners) {
				this.canvas.addEventListener(type, this._listeners[type]);
		}
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

		this.markerHorzDist = spaceHorz;
		this.markerVertDist = spaceVert;

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
				if (self.dancers.active === dancer) {
						dancer.element.removeClass("active");
						self.dancers.active = null;
				} else {
						self.dancers.active &&
								self.dancers.active.element.removeClass("active");
						dancer.element.addClass("active");
						self.dancers.active = dancer;
				}
		});
		this.dancers.push(dancer);
}

Stage.prototype.snapH = function(x) {
		return Math.floor((x+25)/(this.markerHorzDist/2))*(this.markerHorzDist/2);
}

Stage.prototype.snapV = function(x) {
		return Math.floor((x+25)/(this.markerVertDist/2))*(this.markerVertDist/2);
}
Stage.prototype._onMouseMove = function(event) {
		var pos = offsets(event);

		if (this.dancers.active !== null)  {
				var dancer =this.dancers.active;
				dancer.x = this.snapH(pos.x-8);
				dancer.y = this.snapV(pos.y-8);
		}


		this.draw();
/*		this.context.save();
		this.context.beginPath();
		this.context.fillStyle = "green";
		this.context.arc(this.snapH(pos.x-8),this.snapV(pos.y-8),16,0,2*Math.PI);
		this.context.fill();

		this.context.restore();*/
}
Stage.prototype._onMouseDown = function(event) {
}
Stage.prototype._onMouseUp = function(event) {
}
Stage.prototype._onClick = function(event) {
}
