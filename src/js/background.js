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
  // chrome.tabs.create({url: "settings/settings.html"});

	// Adds the context menu item
	chrome.contextMenus.create({
		id: "spotisearchcontext",
		title: "Search on Spotify",
		contexts: ["selection"]
	});

	// Sets the default setting for the search target
	chrome.storage.local.set({"ultimateSpotifyButton": 1});
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	chrome.storage.local.get("ultimateSpotifyButton", function (result) {
		if (result.ultimateSpotifyButton == 1) {
			chrome.tabs.update(tab.id, {url: "spotify:search:\"" + info.selectionText + "\""});
		} else {
			chrome.tabs.create({url: "https://open.spotify.com/search/" + info.selectionText});
		}
	});
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // If the message is send by a content script
  chrome.storage.local.get("ultimateSpotifyButton", function (result) {
    if (result.ultimateSpotifyButton == 1) {
      chrome.tabs.update(sender.tab.id, {url: "spotify:search:" + request.terms});
      console.log("spotify:search:\"" + request.terms + "\"")
    } else {
      chrome.tabs.create({url: "https://open.spotify.com/search/results/" + request.terms});
    }
  });
});

// New page load listener
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var taburl = tab.url;
	var youtubeRegex = RegExp(/.*:\/\/(www\.)?youtube\.com\/watch.*/);
	var soundcloudRegex = RegExp(/.*:\/\/(www\.)?soundcloud\.com.*/);
	var bandcampRegex = RegExp(/.*:\/\/.*\.bandcamp\.com.*/);
	if (youtubeRegex.test(taburl)) {
		chrome.tabs.executeScript(tab.id, {file:"js/lib/jquery.min.js", runAt:"document_end"}, function () {
			chrome.tabs.executeScript(tab.id, {file:"js/textfiltering.js", runAt:"document_end"}, function () {
				chrome.tabs.executeScript(tab.id, {file:"js/youtube.js", runAt:"document_end"});
			});
		});
	} else if (soundcloudRegex.test(taburl)) {
		chrome.tabs.executeScript(tab.id, {file:"js/lib/jquery.min.js", runAt:"document_end"}, function () {
			chrome.tabs.executeScript(tab.id, {file:"js/textfiltering.js", runAt:"document_end"}, function () {
				chrome.tabs.executeScript(tab.id, {file:"js/soundcloud.js", runAt:"document_end"});
			});
		});
	} else if (bandcampRegex.test(taburl)) {
		chrome.tabs.executeScript(tab.id, {file:"js/lib/jquery.min.js", runAt:"document_end"}, function () {
			chrome.tabs.executeScript(tab.id, {file:"js/textfiltering.js", runAt:"document_end"}, function () {
				chrome.tabs.executeScript(tab.id, {file:"js/bandcamp.js", runAt:"document_end"});
			});
		});
	}
});
