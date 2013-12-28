function main_init(elemid) {
		var stage  = new Stage(document.getElementById(elemid));
		stage.displayNames = $("#display-names").prop("checked");
		stage.displayGrid = $("#display-grid").prop("checked");
		var str = loadPageVar("stage");
		if (str !== "") {

				Stage.deserializeInto(str, stage);

		} else {

				stage.setMarkers(6,3);
				
				stage.addDancer("Shreepal", "M", "yellow");
				stage.addDancer("Vijay", "M", "yellow");
				stage.addDancer("Mitra", "F", "yellow");
				stage.addDancer("Shaina", "F", "yellow");
				stage.addDancer("Vishalsai", "M", "pink");
				stage.addDancer("Shawn", "M", "pink");
				stage.addDancer("Shalini", "F", "pink");
				stage.addDancer("Yazzy", "F", "pink");
				stage.addDancer("Sid", "M", "purple");
				stage.addDancer("Samir", "M", "purple");
				stage.addDancer("Shahana", "F", "purple");
				stage.addDancer("Sowyma", "F", "purple");

		}
		return stage;
}

function updateFrameCountUI() {
		$("#current-frame").html(stage.frame+1);
		$("#total-frames").html(stage.frameCount);
}
