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

/*
 * Returns the DOM of the button
 */
function spotifyButton(title) {
    var btn = document.createElement("img");
    btn.className = "spotifyButton";
    btn.src = chrome.extension.getURL("icons/icon32.png");
    btn.addEventListener("click", function () {
        title = filterText(title);
        openURI(title);
    });
    btn.style.cursor = "pointer";

    return btn;
}

// ======================= YOUTUBE ===============================
/*
 * Adds the button on youtube
 */

function injectYTOldDesign() {
    if (document.location.href.search("youtube.com/watch") == -1 ||
        !document.getElementById("watch-header") ||
        document.getElementById("spotifyButton"))
        return;
    // Button creation, styling and positioning
    var spotifyButton = document.createElement("div");
    spotifyButton.className = "yt-uix-menu";
    spotifyButton.id = "spotifyButton";
    spotifyButton.style.border = "1px solid #8dbe00";
    spotifyButton.style.borderRadius = "5px";

    var firstDiv = document.createElement("div");
    firstDiv.className = "yt-uix-menu-trigger";

    var mainButton = document.createElement("button");
    mainButton.className = "yt-uix-button yt-uix-button-size-default yt-uix-button-opacity";
    mainButton.type = "button";
    mainButton.id = "action-panel-overflow-button";
    mainButton.setAttribute("aria-haspopup", "false");
    mainButton.setAttribute("data-button-toggle", "false");

    var textSpan = document.createElement("span");
    textSpan.className = "yt-uix-button-content";
    textSpan.textContent = "Search on Spotify";

    mainButton.appendChild(textSpan);
    firstDiv.appendChild(mainButton);
    spotifyButton.appendChild(firstDiv);
    document.getElementById("watch8-secondary-actions").appendChild(spotifyButton);

    // Set the onclick attribute
    mainButton.addEventListener("click", function () {
        var title = document.getElementById("eow-title").innerHTML,
            cleanTitle = filterText(title);

        openURI(cleanTitle);
    });
}

function injectYTMaterialDesign() {
    if (document.location.href.search("youtube.com/watch") == -1 ||
        !document.getElementById("top-level-buttons") ||
        document.getElementById("spotifyButton"))
        return;
    // Button creation, styling and positioning
    var spotifyButton = document.createElement("ytd-button-renderer");
    spotifyButton.id = "spotifyButton";
    spotifyButton.className = "style-scope ytd-menu-renderer style-default";
    //spotifyButton.setAttribute("is","ytd-button-renderer")
    spotifyButton.setAttribute("button-renderer","")
    spotifyButton.setAttribute("has-no-text","")
    spotifyButton.setAttribute("is-icon-button","")
    spotifyButton.style.border = "1px solid #8dbe00";
    spotifyButton.style.borderRadius = "5px";

    var anchor  = document.createElement("a");
    anchor.setAttribute("is", "yt-endpoint");
    anchor.setAttribute("tabindex", "-1");
    anchor.className = "style-scope ytd-button-renderer";

    var subButton = document.createElement("button");
    subButton.className = "style-scope ytd-toggle-button-renderer style-text";
    subButton.style.width = "100%";
    subButton.style.boxSizing = "border-box";
    subButton.style.padding = "20%";
//    subButton.style.margin = "0px auto";
    subButton.setAttribute("is","paper-icon-button-light");
    subButton.setAttribute("aria-label", "Search on Spotify");

    var icon = document.createElement("img")
    icon.style.width = "100%"
    icon.src = chrome.extension.getURL("icons/icon32-material.png");

    subButton.appendChild(icon)
    anchor.appendChild(subButton);
    spotifyButton.appendChild(anchor);
    try{
        document.getElementById("top-level-buttons").appendChild(spotifyButton);

        // Set the onclick attribute
        spotifyButton.addEventListener("click", function () {
            var title = document.getElementsByClassName("title")[0].textContent,
                cleanTitle = filterText(title);

            openURI(cleanTitle);
        });
    } catch(e) {}
}

function youtubeButton() {
    // Check which design is used
    if (document.getElementById("page-container")) { // Previous Design
        injectYTOldDesign();
        var observer = new MutationObserver(function(mutations) {
            injectYTOldDesign();
        });
        observer.observe(document.getElementById("page-container"), { subtree: true, childList: true });
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

}

// When the page loads, add the button and the listener
if (document.location.href.search("youtube.com") > -1) {
    youtubeButton();
}

//========================= SOUNDCLOUD ===========================
var soundcloudAdded = false;

// Adds the button on soundcloud
function soundcloudButton() {
    var titles = document.getElementsByClassName("soundTitle__title");

    if (titles.length != 0) {
        for (var i = 0; i < titles.length; i++) {
            if (titles[i].parentNode.lastChild.className != "spotifyButton") {
                var text = titles[i];
                titles[i].parentNode.appendChild(spotifyButton(titles[i].firstChild.nextSibling.textContent));
            }
        }
    }

    soundcloudAdded = false;
}

// When the page loads, add the button and the listener
if (document.location.href.search("soundcloud.com") > -1) {
    soundcloudButton();
    var observer = new MutationObserver(function(mutations) {
        if (!soundcloudAdded) {
            soundcloudAdded = true;
            setTimeout(function(){soundcloudButton();}, 1000);
        }
    });
    observer.observe(document.getElementById("content"), { subtree: true, childList: true });
}

//========================== BANDCAMP ============================
if (document.location.href.search("bandcamp.com") > -1) {
    var name = document.getElementById("band-name-location").firstChild.nextSibling.textContent;
    document.getElementById("band-name-location").appendChild(spotifyButton(name));
}
