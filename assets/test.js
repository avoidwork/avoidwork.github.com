var obj = document.createElement("div");
obj.innerHTML = "<iframe width='300' id='testing' height='50' src='about:blank'></iframe>";
obj.childNodes[0].id = "testing";
document.body.appendChild(obj);
setTimeout(function(){
	document.getElementById("testing").contentWindow.document.body.innerHTML = "testing";
}, 250);
