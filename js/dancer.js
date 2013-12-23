function DancersList(el) {
		this.element = $(el);
		this.array = [];
		this.active = null;
}

DancersList.prototype.push = function (dancer) {
		this.array.push(dancer);
		this.element.append(dancer.element);
}

DancersList.prototype.makeActive = function(d) {
		this.makeInactive();
		d.element.addClass("active");
		this.active = d;

}
DancersList.prototype.makeInactive = function() {
		this.active && this.active.element.removeClass("active");
		this.active = null;
}

function Dancer(id, name, gender, color) {
		this.id = id;
		this.name = name;
		this.gender = gender;
		this.color = color;
		var badge = '<span class="'+ color +' badge">' + gender + '</span>';
		this.element = $('<a>' + id +". "+ name + badge + '</a>')
				.addClass("dancer list-group-item ");

		this.r = 16
		this.xs = [];
		this.ys = [];
}

Dancer.prototype.serialize = function(markerHorzDist, markerVertDist) {

		var dancerObject = {
				i: this.id,
				n: this.name,
				g: this.gender,
				c: this.color,
				xs: [],
				ys: [],
		};

		var idx;
		for ( idx in this.xs) {
				var x = this.xs[idx];
				var y = this.ys[idx];

				if (x !== undefined) {
						dancerObject['xs'][idx] =  Math.round((x/markerHorzDist)*100)/100;
				}

				if (y !== undefined) {
						dancerObject['ys'][idx] =  Math.round((y/markerVertDist)*100)/100;
				}
		}
		return dancerObject;
}

Dancer.prototype.draw = function(stage) {
		var ctx = stage.context;
		var x = this.xs[stage.frame];
		var y = this.ys[stage.frame];
		if (x !== undefined && y !== undefined) {
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = COLORS[this.color];
				if (this.gender === "M") {
						ctx.arc(x, y, this.r, 0, 2*Math.PI);
				} else {
						ctx.rect(x-this.r, y-this.r, this.r*2, this.r*2);
				}
				ctx.closePath();
				ctx.fill();
				ctx.fillStyle = "darkgrey";
				ctx.beginPath();
				ctx.fillText(this.id, x, y+4);
				ctx.closePath();

				if(stage.displayNames) {
						ctx.translate(x, y-this.r*1.5);
						console.log("drawing name");
						ctx.fillStyle="black";
						ctx.textAlign = "left";
						ctx.font = "Bold 10pt sans-serif";
						ctx.fillText(this.name, this.r, this.r);
				}


				ctx.restore();
		}

		if (stage._focused === this) {
				ctx.save();
				ctx.strokeStyle = "black";
				if (this.gender === "M") {
						ctx.arc(x, y, this.r+3, 0, 2*Math.PI);
				} else {
						ctx.rect(x-this.r-3, y-this.r-3, this.r*2+6, this.r*2+6);
				}
				ctx.stroke();
				ctx.restore();
		}
}
