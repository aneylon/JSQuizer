// console.log("go time!");
// alert("get it!");

window.onload = function (){

	document.getElementById("addStuff").onclick = function() {
		console.log("add it up");
		var para = document.createElement("p");
		var node = document.createTextNode("This is new.");
		para.appendChild(node);

		var element = document.getElementById("div1");
		element.appendChild(para);
	}

	document.getElementById("addTwo").onclick = function (){
		var para = document.createElement("p");
		var node = document.createTextNode("This is new too.");
		para.appendChild(node);
		var element = document.getElementById("div1");
		var child = document.getElementById("p1");
		element.insertBefore(para,child);
	}

	document.getElementById("removeStuff").onclick = function() {
		console.log("take it away");
		var parent = document.getElementById("div2");
		var child = document.getElementById("remove");
		parent.removeChild(child);
	}

	document.getElementById("replaceStuff").onclick = function() {
		console.log("ir-re-place-able");
		var para = document.createElement("p");
		var node = document.createTextNode("replaced.");
		para.appendChild(node);
		var parent = document.getElementById("div3");
		var child = document.getElementById("replace");
		parent.replaceChild(para,child);
	}

	document.getElementById("writeIt").onclick = function() {
		document.write("<link rel='stylesheet' href='AddAndRemove.css'>")
		document.write("<h1>this is a test</h1><br><h2>this is only a test</h2>");
		document.writeln("and another thing");
	}
}