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
const searchOnWeb = (tabId, term) => {
  chrome.tabs.create({url: "https://open.spotify.com/search/" + term});
}
const searchOnDesktop = (tabId, term) => {
  chrome.tabs.update(tabId, {url: "spotify:search" + '"' + term + '"'});
}
const searchHandlers = { 0: searchOnWeb, 1: searchOnDesktop}

const getStorageAndSearch = (tabId, term) => {
	chrome.storage.local.get("ultimateSpotifyButton", function (result) {
    handler = searchHandlers[result.ultimateSpotifyButton];
    handler(tabId, term)
	});
}

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

chrome.contextMenus.onClicked.addListener((info, tab) => {getStorageAndSearch(tab.id, info.selectionText)});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {getStorageAndSearch(sender.tab.id, request.terms)});

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
