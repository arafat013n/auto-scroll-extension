let isEnabled = true;

// স্টেট আপডেট ফাংশন
const updateState = () => {
  chrome.storage.local.get(["isEnabled"], (res) => {
    isEnabled = res.isEnabled !== false;
  });
};

updateState();
chrome.storage.onChanged.addListener(updateState);

// ভিডিও মনিটর এবং স্ক্রোল লজিক
const monitorVideos = () => {
  if (!isEnabled) return;

  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    // ভিডিওটি স্ক্রিনে দৃশ্যমান কি না চেক করা
    if (video.offsetParent !== null && !video.dataset.scrolled) {
      // ভিডিও শেষ হওয়ার ০.৫ সেকেন্ড আগে চেক
      if (video.currentTime >= video.duration - 0.5 && video.duration > 0) {
        video.dataset.scrolled = "true";

        window.scrollBy({
          top: window.innerHeight,
          behavior: "smooth",
        });

        // নতুন ভিডিওর জন্য ৩ সেকেন্ড পর রিসেট
        setTimeout(() => {
          video.dataset.scrolled = "";
        }, 3000);
      }
    }
  });
};

// প্রতি ৫০০ মিলিসেকেন্ডে চেক করবে
setInterval(monitorVideos, 500);
