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
var PATTERN = [
	/[!@#$%^:;"'<>?/|\~`1234567890]/g,
	/official/ig,
	/video/ig,
	/live/ig,
	/acoustic/ig,
	/lyrics/ig,
	/lyric/ig,
	/hd/ig,
	/quality/ig,
	/720p/ig,
	/1080p/ig,
	/cover/ig,
	/guitar/ig,
	/drum/ig,
	/band/ig,
	/vocals/ig,
	/vocal/ig,
	/vs/ig,
	/feat/ig,
	/ft/ig,
	/full/ig,
	/album/ig,
	/streaming/ig,
	/stream/ig,
	/extended/ig,
	/radio/ig,
	/edit/ig,
	/remix/ig,
	/\n/g,
	/\./g,
	/-/g,
	/&/g,
	"amp",
	/\(.*?\)/g,
	/\[.*?\]/g,
	/\{.*?\}/g
];

/*
 * Filters the given string using PATTERN
 */
function filterText(text) {
	for (var i = 0; i < PATTERN.length; i++) {
		text = text.replace(PATTERN[i], "");
	}
	text.replace(' ')

	return text;
}

/*
 * Opens the Spotify search uri using the given terms
 */
function openURI(term) {
	chrome.runtime.sendMessage({terms: term});
}
