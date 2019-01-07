(function () {
	var curWindow = this; // class Window
	var isActive = false;
	// var userAgent = "";  
 //    if (curWindow.navigator) {
 //        if (curWindow.navigator.userAgent) {
 //            userAgent = curWindow.navigator.userAgent;
 //        }
 //    }

	document.addEventListener("mouseup", function(event) { 
		var selection = curWindow.getSelection();
		var selectedText = selection.toString().trim();

		if (selectedText != "") {
			addPopupIcon(event, selection);
			console.log(selectedText); 
		}
	});

	document.addEventListener("mousedown", function(event) {
		var mainBlock = document.getElementById("kdb");
		if (mainBlock != null) {
			document.body.removeChild(mainBlock);
		}
	});

    // Only for Chrome
	var someScrollingCheck = function(doc) {
        return (doc.scrollingElement ? doc.scrollingElement : doc.body) || doc.documentElement
	};

	var addPopupIcon = function(event, selection) {
		selection = selection.getRangeAt(0).getBoundingClientRect();

		var iconBlock = document.createElement("div");
		iconBlock.className = "kdb-popup-icon";
		var mainBlock = document.createElement("div");
		mainBlock.appendChild(iconBlock);

		mainBlock.id = "kdb";
		mainBlock.style.position = "absolute";
		mainBlock.style.left = event.clientX + someScrollingCheck(document).scrollLeft - 13 + "px";
		var yPos = event.clientY;
		yPos - selection.top > selection.height / 2 ? yPos = selection.bottom + 1 : yPos = selection.top - 1 - 27;
		mainBlock.style.top = yPos + someScrollingCheck(document).scrollTop + "px";

		document.body.appendChild(mainBlock);
	};

	console.log("Code is valid!")
})();