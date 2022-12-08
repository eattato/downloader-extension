var port = chrome.extension.connect({
  name: "splitDL",
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function (msg) {
  console.log("message recieved" + msg);
});

window.addEventListener("load", function () {
  console.log("popup loaded");
  let urlInput = $(".input_url");
  let dlButton = $(".input_download");
  let dlList = $(".download_list");

  dlButton.click(() => {
    let input = urlInput.val();
  });
})();
