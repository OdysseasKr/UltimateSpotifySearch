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
const text = $("#band-name-location span.title").text();

if ($("#band-name-location .spotifyButton").length == 0)
  $("#band-name-location").append(spotifyButton(text));

function spotifyButton(text) {
  const element = $("<div></div>", {
    text: "Spotify Search",
    class: "spotifyButton",
  });

  element.data("term", text);

  element.css({
    cursor: "pointer",
    display: "inline-block",
    "font-size": "1em",
    border: "2px solid #8dbe00",
    "border-radius": "3px",
    padding: "0.25em",
    margin: "0.25em",
    "background-color": "#8dbe00",
  });

  element.on("click", (e) => {
    openURI(text);
  });

  return element;
}
undefined;
