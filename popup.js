document.addEventListener('DOMContentLoaded', () => {
  const engineList = document.getElementById('engineList');
  const currentEngineSpan = document.querySelector('#currentEngine span');

  chrome.storage.sync.get('currentEngine', (data) => {
    if (data.currentEngine) {
      currentEngineSpan.textContent = data.currentEngine;
    } else {
      currentEngineSpan.textContent = 'google';
    }
  });

  engineList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const engine = event.target.dataset.engine;
      chrome.runtime.sendMessage({ action: 'setEngine', engine }, (response) => {
        if (response.success) {
          currentEngineSpan.textContent = engine;
        }
      });
    }
  });
});