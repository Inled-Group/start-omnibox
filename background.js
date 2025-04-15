const searchEngines = {
  google: "https://www.google.com/search?q=",
  bing: "https://www.bing.com/search?q=",
  duckduckgo: "https://duckduckgo.com/?q=",
  brave: "https://search.brave.com/search?q=",
  qwant: "https://www.qwant.com/?q=",
  wikipedia: "https://es.wikipedia.org/wiki/Special:Search?search="
};

let currentEngine = 'google';

chrome.storage.sync.get('currentEngine', (data) => {
  if (data.currentEngine) {
    currentEngine = data.currentEngine;
  }
});

chrome.omnibox.onInputEntered.addListener((text) => {
  const url = searchEngines[currentEngine] + encodeURIComponent(text);
  chrome.tabs.create({ url });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setEngine') {
    currentEngine = request.engine;
    chrome.storage.sync.set({ currentEngine });
    sendResponse({ success: true });
  }
});