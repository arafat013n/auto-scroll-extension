document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.getElementById("toggleBtn");

  // ১. ব্রাউজার স্টোরেজ থেকে স্টেট লোড করা (রিস্টার্ট দিলেও মুছবে না)
  chrome.storage.local.get(["isEnabled"], (result) => {
    toggleInput.checked = result.isEnabled !== false;
  });

  // ২. স্টেট পরিবর্তন হলে সেভ করা
  toggleInput.addEventListener("change", () => {
    chrome.storage.local.set({ isEnabled: toggleInput.checked });
  });

  // ৩. সোশ্যাল লিঙ্ক হ্যান্ডেলার
  const setupLink = (id, url) => {
    document.getElementById(id).addEventListener("click", (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: url });
    });
  };

  setupLink("fbLink", "https://www.facebook.com/akash06r");
  setupLink("ghLink", "https://github.com/arafat013n");
});
