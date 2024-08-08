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
chrome.storage.local.get("ultimateSpotifyButton", (result) => {
  document.querySelector("#spotifyTarget").value = result.ultimateSpotifyButton.toString();
});

// Save changes on button click
document.querySelector("#spotifyTarget").addEventListener("change", (e) => {
  chrome.storage.local.set({"ultimateSpotifyButton": parseInt(e.target.value)});
});

