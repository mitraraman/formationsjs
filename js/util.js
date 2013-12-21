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
