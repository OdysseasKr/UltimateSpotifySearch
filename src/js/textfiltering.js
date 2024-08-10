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
const PATTERN = [
  /[!@#$%^&:;"'<>?/|\~`1234567890\.,\-\n]/g,
  /official/gi,
  /video/gi,
  /live/gi,
  /acoustic/gi,
  /lyrics/gi,
  /lyric/gi,
  /hd/gi,
  /quality/gi,
  /720p/gi,
  /1080p/gi,
  /cover/gi,
  /guitar/gi,
  /drum/gi,
  /band/gi,
  /vocals/gi,
  /vocal/gi,
  /vs/gi,
  /feat/gi,
  /ft/gi,
  /full/gi,
  /album/gi,
  /streaming/gi,
  /stream/gi,
  /extended/gi,
  /radio/gi,
  /edit/gi,
  /remix/gi,
  "amp",
  /\(.*?\)/g,
  /\[.*?\]/g,
  /\{.*?\}/g,
];

/*
 * Filters the given string using PATTERN
 */
function filterText(text) {
  for (let i = 0; i < PATTERN.length; i++) {
    text = text.replace(PATTERN[i], "");
  }
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

/*
 * Opens the Spotify search uri using the given terms
 */
function openURI(term) {
  chrome.runtime.sendMessage({ terms: term });
}
