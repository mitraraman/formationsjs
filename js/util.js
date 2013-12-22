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



/* Color Definitions */
var COLORS = {
		pink: "#D61D5C",
		purple: "#43155B",
		green: "#64A363",
		blue: "#078FB1",
		yellow: "#F7E418",
		orange: "#A23416"
};
