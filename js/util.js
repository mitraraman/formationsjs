function offsets(event) {
		if (event.offsetX !== undefined) {
				return {x: event.offsetX, y: event.offsetY };
		} else {
				var t = event.target.getBoundingClientRect();
				return {
						x: event.clientX - t.left,
						y: event.clientY - t.top
				}
		}
}

function dist(x1,y1,x2,y2) {
		return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

function insideDancer(d, x, y) {
		return dist(d.x, d.y, x, y) <= d.r;
}

/* Color Definitions */
var COLORS = {
		pink: "#D61D5C",
		purple: "#43155B",
		green: "#299E27",
		blue: "#078FB1",
		yellow: "#F7E418",
		orange: "#FF7032"
};
