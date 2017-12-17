/*
	This file is part of Ultimate Spotify Search.

	Ultimate Spotify Search is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Ultimate Spotify Search is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with Ultimate Spotify Search.  If not, see <http://www.gnu.org/licenses/>.
*/
// Check which design is used
if ($("#page-container").length != 0) { // Previous Design
	setTimeout(function () {
		injectYTOldDesign();
	},1000);
} else { // Material Design
	setTimeout(function () {
		injectYTMaterialDesign();
		document.addEventListener('transitionend', function(e) {
		if (e.target.id === 'progress')
			setTimeout(function () {
				injectYTMaterialDesign();
			},1000);
		});
	}, 2000);
}

/*
 * Adds the button on youtube
 */

function injectYTOldDesign() {
	if ($("#watch-header").length == 0 ||
		$(".spotifyButton").length != 0)
		return;
	// Button creation, styling and positioning
	var spotifyButton = $("<div></div>", {
		"class": "yt-uix-menu spotifyButton",
	});
	spotifyButton.css({
		"border": "1px solid #8dbe00",
		"borderRadius": "5px"
	});

	var firstDiv = $("<div></div>", {
		"class": "yt-uix-menu-trigger"
	});

	var mainButton = $("<button></button>", {
		"class": "yt-uix-button yt-uix-button-size-default yt-uix-button-opacity",
		"type": "button",
		"id": "action-panel-overflow-button",
		"aria-haspopup": "false",
		"data-button-toggle": "false"
	});

	var textSpan = $("<span></span>", {
		"class": "yt-uix-button-content",
		text: "Search on Spotify"
	});

	mainButton.append(textSpan);
	firstDiv.append(mainButton);
	spotifyButton.append(firstDiv);
	$("#watch8-secondary-actions").append(spotifyButton);

	// Set the onclick attribute
	mainButton.on("click", function () {
		var title = $("#eow-title").text(),
			cleanTitle = filterText(title);

		openURI(cleanTitle);
	});
}

function injectYTMaterialDesign() {
	if ($("#top-level-buttons").length == 0 ||
		$(".spotifyButton").length != 0)
		return;
	// Button creation, styling and positioning
	var spotifyButton = $("<ytd-button-renderer></ytd-button-renderer>", {
		class: "spotifyButton style-scope ytd-menu-renderer style-default",
		"button-renderer": "",
		"has-no-text": "",
		"is-icon-button": "",
	});
	spotifyButton.css({
		"border": "1px solid #8dbe00",
		"border-radius": "5px"
	});

	var anchor = $("<a></a>", {
		"is": "yt-endpoint",
		"tabindex": "-1",
		"class": "style-scope ytd-button-renderer"
	});

	var subButton = $("<button></button>", {
		class: "style-scope yt-icon-button"
	});
	subButton.css({
		"width": "100%",
		"box-sizing": "border-box",
		"padding": "20%",
		"is": "paper-icon-button-light",
		"aria-label": "Search on Spotify"
	});


	var icon = $("<img>", {
		"src": chrome.runtime.getURL("icons/icon32-material.png")
	})
	icon.css("width", "100%");
	try{
		$(".ytd-video-primary-info-renderer #top-level-buttons").append(spotifyButton);
		setTimeout(function (){
			spotifyButton.append(anchor);
			anchor.append(subButton);
			subButton.append(icon)
		},500);

		// Set the onclick attribute

		spotifyButton.on("click", function () {
			var title = $(".title:first").text(),
				cleanTitle = filterText(title);

			openURI(cleanTitle);
		});
	} catch(e) {
	}
}
