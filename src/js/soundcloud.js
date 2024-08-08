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
var soundcloudAdded = false;

soundcloudButton();
var observer = new MutationObserver(function(mutations) {
	if (!soundcloudAdded) {
		soundcloudAdded = true;
		setTimeout(function(){soundcloudButton();}, 1000);
	}
});
observer.observe(document.getElementById("content"), { subtree: true, childList: true });

// Adds the button on soundcloud
function soundcloudButton() {
	$('.soundTitle__title').each(function(i, obj) {
		if ($(obj).parent().find(".spotifyButton").length == 0) {
			var text = $(obj).find("span:first-child").text();
			spotifyButton(text).insertAfter(obj);
		}
	});

	soundcloudAdded = false;
}


function spotifyButton(text) {
	var element = $("<div></div>", {
		text: "Search on Spotify",
		class: "spotifyButton",
	});

	element.css({
		"cursor": "pointer",
		"display": "inline-block",
		"font-size": "0.7em",
		"border": "1px solid #8dbe00",
		"border-radius": "3px",
		"padding": "0.25em",
		"margin": "0.25em",
		"width": "calc(17 * 0.5em)"
	});

	element.on("click", function (e) {
		openURI(text);
	})

	return element;
}
