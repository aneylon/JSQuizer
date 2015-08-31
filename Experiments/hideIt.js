window.onload = function(){

	document.getElementById("startButton").onclick = function() {
		document.getElementById("start").style.display = "none";
		document.getElementById("finish").style.display = "none";
		document.getElementById("quiz").style.display = "inherit";
	}

	document.getElementById("backToStartButton").onclick = function() {
		document.getElementById("quiz").style.display = "none";
		document.getElementById("finish").style.display = "none";
		document.getElementById("start").style.display = "inherit";
	}

	document.getElementById("finishedButton").onclick = function() {
		document.getElementById("start").style.display = "none";
		document.getElementById("quiz").style.display = "none";
		document.getElementById("finish").style.display = "inherit";
	}
}