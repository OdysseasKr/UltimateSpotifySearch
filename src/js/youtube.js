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

async function main() {
  await sleep(2000);
  periodicInjector();
  document.addEventListener("transitionend", async (e) => {
    if (e.target.id === "progress")
      await sleep(1000);
      periodicInjector();
  });
}
main();

const createButton = (text) => {
  const element = $("<div></div>", {
    text: "Spotify Search",
    class: "spotifyButton",
  });
  element.css({
    cursor: "pointer",
    display: "inline-block",
    "font-size": "1.4rem",
    border: "0.4rem solid #8dbe00",
    "border-radius": "18px",
    padding: "0.15rem",
    "background-color": "#8dbe00",
    position: "absolute",
    right: "0",
    top: "0",
  });

  element.on("click", () => {
    const text = $(".watch-active-metadata #title h1").text();
    openURI(filterText(text));
  });
  return element;
};

function periodicInjector() {
  const interval = setInterval(() => {
    if (injectButton()) {
      clearInterval(interval);
    }
  }, 1000);
}

const injectButton = () => {
  if ($(".watch-active-metadata #title").length == 0) return false;
  if ($(".spotifyButton").length != 0) return true;

  const spotifyButton = createButton();
  try {
    $(".watch-active-metadata #title.style-scope.ytd-watch-metadata").append(spotifyButton);
    return false;
  } catch (e) {
    console.log("Error injecting spotify button", e);
  }
  return false;
};
