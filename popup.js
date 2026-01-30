document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.getElementById("toggleBtn");

  // 1. Load the current state from storage (remains persistent after restart)
  chrome.storage.local.get(["isEnabled"], (result) => {
    toggleInput.checked = result.isEnabled !== false;
  });

  // 2. Save the state when the toggle is changed
  toggleInput.addEventListener("change", () => {
    chrome.storage.local.set({ isEnabled: toggleInput.checked });
  });

  // 3. Social link click handlers
  const setupLink = (id, url) => {
    document.getElementById(id).addEventListener("click", (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: url });
    });
  };

  setupLink("fbLink", "https://www.facebook.com/akash06r");
  setupLink("ghLink", "https://github.com/arafat013n");
});
