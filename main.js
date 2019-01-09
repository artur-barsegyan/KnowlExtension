(function () {
	var curWindow = this; // class Window
	var isOpened = false;
	// var userAgent = "";
 //    if (curWindow.navigator) {
 //        if (curWindow.navigator.userAgent) {
 //            userAgent = curWindow.navigator.userAgent;
 //        }
 //    }

	document.addEventListener("mouseup", function(event) {
		var selection = curWindow.getSelection();
		var selectedText = selection.toString().trim();

		if (selectedText != "" && !isOpened) {
			addPopupIcon(event, selection);
			console.log(selectedText);
		}
	});

	var removeKDBDiv = function() {
		var mainBlock = document.getElementById("kdb");
		if (mainBlock != null) {
			document.body.removeChild(mainBlock);
		}
	};

	document.addEventListener("mousedown", function(event) {
		if (isOpened) {
			return;
		}

		var mainBlock = document.getElementById("kdb");
		if (mainBlock != null) {
			// Click on popup icon
			if (event.target == document.getElementsByClassName("kdb-popup-icon")[0]) {
				mainBlock.removeChild(document.getElementsByClassName("kdb-popup-icon")[0]);
				clickEventHandler(mainBlock, event);
			} else {
				document.body.removeChild(mainBlock);
			}
		}
	});

	var clickEventHandler = function(mainBlock, clickEvent) {
		fetch(chrome.runtime.getURL('/popup_window.html'))
    	.then(response => response.text())
    	.then(data => {
			var closeImgURL = chrome.runtime.getURL("images/close.png");
			var cssURL = chrome.runtime.getURL("popup.css");

			document.head.innerHTML += "<link rel=\"stylesheet\" href=\"" + cssURL + "\">";
			mainBlock.innerHTML = data;
			document.getElementById("closeButtonIcon").src = closeImgURL;

			document.getElementById("closeButton").onclick = function() {
				isOpened = false;
				removeKDBDiv();
			};

			// console.log("HERE232323");
			mainBlock.style.position = "absolute";
			mainBlock.style.left = clickEvent.clientX - 13 + "px";
			var yPos = clickEvent.clientY;
			// yPos - selection.top > selection.height / 2 ? yPos = selection.bottom + 1 : yPos = selection.top - 1 - 27;
			mainBlock.style.top = yPos + "px";

			isOpened = true;
	    }).catch(err => {
	        console.log("Error! Can't inject popup window in html. Reason: " + err);
	    });
	};

    // Only for Chrome
	var someScrollingCheck = function(doc) {
        return (doc.scrollingElement ? doc.scrollingElement : doc.body) || doc.documentElement
	};

	var addPopupIcon = function(event, selection) {
		selection = selection.getRangeAt(0).getBoundingClientRect();

		var iconBlock = document.createElement("div");
		iconBlock.className = "kdb-popup-icon";
		iconBlock.onclick = clickEventHandler;

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
