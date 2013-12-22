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
		var badge = '<span class="'+ color +' badge">' + gender + '</span>';
		this.element = $('<a>' + id +". "+ name + badge + '</a>')
				.addClass("dancer list-group-item ");

		this.x = null;
		this.y = null;
}

Dancer.prototype.draw = function(stage) {
		var ctx = stage.context;
		if (this.x !== null && this.y !== null) {
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = COLORS[this.color];
				ctx.arc(this.x, this.y, 16, 0, 2*Math.PI);
				ctx.closePath();
				ctx.fill();
				ctx.restore();
		}
}
