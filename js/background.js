chrome.extension.onConnect.addListener(function (port) {
  console.log("popup.js 연결됨");
  port.onMessage.addListener(function (msg) {
    port.postMessage("Hi Popup.js");
    console.log("message sent");
  });

  // 다운로드 시작 시
  chrome.downloads.onCreated.addListener((item) => {
    console.log(item.filename + " is downloading from " + item.finalUrl);
  });
});
