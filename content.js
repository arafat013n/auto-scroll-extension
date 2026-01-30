let isEnabled = true;

// Function to update the extension state from storage
const updateState = () => {
  chrome.storage.local.get(["isEnabled"], (res) => {
    isEnabled = res.isEnabled !== false;
  });
};

// Initial state load
updateState();

// Listen for state changes (On/Off) from the popup
chrome.storage.onChanged.addListener(updateState);

// Logic to monitor video playback and perform auto-scroll
const monitorVideos = () => {
  if (!isEnabled) return;

  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    // Check if the video is currently visible and hasn't been scrolled yet
    if (video.offsetParent !== null && !video.dataset.scrolled) {
      // Check if the video is near its end (0.5 seconds remaining)
      if (video.currentTime >= video.duration - 0.5 && video.duration > 0) {
        video.dataset.scrolled = "true";

        // Scroll down to the next video/reel
        window.scrollBy({
          top: window.innerHeight,
          behavior: "smooth",
        });

        // Reset the scroll flag after 3 seconds for the next video
        setTimeout(() => {
          video.dataset.scrolled = "";
        }, 3000);
      }
    }
  });
};

// Run the monitor function every 500 milliseconds
setInterval(monitorVideos, 500);
