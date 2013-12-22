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
		this.x = null;
		this.y = null;
}

Dancer.prototype.draw = function(stage) {
		var ctx = stage.context;
		if (this.x !== null && this.y !== null) {
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = COLORS[this.color];
				if (this.gender === "M") {
						ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
				} else {
						ctx.rect(this.x-this.r, this.y-this.r, this.r*2, this.r*2);
				}
				ctx.closePath();
				ctx.fill();
				ctx.fillStyle = "darkgrey";
				ctx.beginPath();
				ctx.fillText(this.id, this.x, this.y+4);
				ctx.closePath();

				if(stage.displayNames) {
						ctx.translate(this.x, this.y-this.r*1.5);
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
						ctx.arc(this.x, this.y, this.r+3, 0, 2*Math.PI);
				} else {
						ctx.rect(this.x-this.r-3, this.y-this.r-3, this.r*2+6, this.r*2+6);
				}
				ctx.stroke();
				ctx.restore();
		}
}
