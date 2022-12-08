console.log("hello");

// 다운로드 시작 시
chrome.downloads.onCreated.addListener((item) => {
  console.log(item.filename + " is downloading from " + item.finalUrl);
});
