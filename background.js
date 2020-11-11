// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
console = chrome.extension.getBackgroundPage().console;
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: 'dark' }, function () {
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { pathSuffix: 'pdf' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.pageAction.onClicked.addListener(function (tab) {
  let darkScript = 'var cover = document.createElement(\"div\");\n  cover.setAttribute(\"style\", \n  `\n  position: fixed;\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: white;\n  mix-blend-mode: difference;\n  z-index: 1;\n  `);\n  cover.id = \"cover\"\n  document.body.appendChild(cover); console.log(document.body);';
  let lightScript = 'document.getElementById("cover").remove(); console.log(document.body); document.body.style.backgroundColor = "rgb(50, 168, 82)"'

  chrome.storage.sync.get(['color'], function (result) {
    let color = result.color
    chrome.storage.sync.set({ color: (result.color == 'light') ? 'dark' : 'light' })

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: color == 'light' ? lightScript : darkScript });
    });
  });
})

function invertColors() {
  alert("inverting colors")
  var cover = document.createElement("div");

  cover.setAttribute("style", 
  `
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  mix-blend-mode: difference;
  z-index: 1;
  `);
  cover.id = "cover"
  document.body.appendChild(cover);
}