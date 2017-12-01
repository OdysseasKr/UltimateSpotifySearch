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
// Load values
chrome.storage.sync.get("ultimateSpotifyButton", function (result) {
	if (result.ultimateSpotifyButton == 1) {
		document.getElementById("desktopTarget").checked = true;
	} else {
		document.getElementById("webTarget").checked = true;
	}
});

// Save changes on button click
document.getElementById("saveButton").addEventListener("click", function () {
	if (document.getElementById("desktopTarget").checked) {
		chrome.runtime.sendMessage({target: 1});
	} else {
		chrome.runtime.sendMessage({target: 0});
	}

	blinkMessage(document.getElementById("notifier"));
});

function blinkMessage(element) {
	var opac = 1;  // initial opacity
	var timer = setInterval(function () {
		if (opac <= 0.1) {
			clearInterval(timer);
			element.style.opacity = 1;
		}
		element.style.opacity = opac;
		opac -= opac * 0.1;
	}, 50);
}
