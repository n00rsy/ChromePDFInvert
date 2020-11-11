'use strict';
chrome.runtime.onInstalled.addListener(function () {
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

  let toggleScript = '  if(document.getElementById(\"cover\") == null) {\n    var cover = document.createElement(\"div\");\n\n    cover.setAttribute(\"style\", \n    `\n    position: fixed;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    background-color: white;\n    mix-blend-mode: difference;\n    z-index: 1;\n    `);\n    cover.id = \"cover\"\n    document.body.appendChild(cover);\n  }\n  else {\n    document.getElementById(\"cover\").remove()\n  }';
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: toggleScript});
    });
})

function invertColors() {
  alert("inverting colors")

  if(document.getElementById("cover") == null) {
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
  else {
    document.getElementById("cover").remove()
  }


}