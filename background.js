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
// On install
chrome.runtime.onInstalled.addListener(function () {
    // Opens the first run page
    chrome.tabs.create({url: "extensionPages/firstRun.html"});

    // Sets the default setting for the search target
    chrome.storage.local.set({"ultimateSpotifyButton": 1});
});

// Adds the context menu item
chrome.contextMenus.create({
    id: "spotisearchcontext",
    title: "Search on Spotify",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    chrome.storage.local.get("ultimateSpotifyButton", function (result) {
        if (result.ultimateSpotifyButton == 1) {
            chrome.tabs.update(tab.id, {url: "spotify:search:\"" + info.selectionText + "\""});
        } else {
            chrome.tabs.create({url: "https://play.spotify.com/search/" + info.selectionText});
        }
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // If the message is send by the settings page
    if (request.target >= 0) {
        chrome.storage.local.set({"ultimateSpotifyButton": request.target});
    } else { // If the message is send by a content script
        chrome.storage.local.get("ultimateSpotifyButton", function (result) {
            if (result.ultimateSpotifyButton == 1) {
                chrome.tabs.update(sender.tab.id, {url: "spotify:search:\"" + request.terms + "\""});
            } else {
                chrome.tabs.create({url: "https://play.spotify.com/search/" + request.terms});
            }
        });
    }
});
