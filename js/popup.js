// popup이 열렸을때
window.addEventListener("load", function () {
  let urlInput = $(".input_url");
  let dlButton = $(".input_download");
  let dlList = $(".download_list");

  const applyData = (datas) => {
    dlList.empty();
    for (let ind in datas) {
      let data = datas[ind];

      let fileElement = $(".download.origin").clone();
      fileElement.removeClass("origin");
      fileElement.find(".download_name").text(data.name);
      fileElement.find(".download_path").text(data.path);
      let progressList = fileElement.find(".download_progress");

      for (let ind in data.progress) {
        let thread = data.progress[ind];

        let threadElement = $(".download_subprogress.origin").clone();
        threadElement.removeClass("origin");
        let threadStatus = threadElement.find(".download_bar");

        threadStatus.css({
          width: Math.floor((thread.current / thread.max) * 100) + "%",
        });
        progressList.append(threadElement);
      }
      dlList.append(fileElement);
    }
  };

  // background.js와 통신
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.act == "data") {
      applyData(msg.param);
    }
  });

  // background.js에서 현재 정보 받기
  let data = chrome.runtime.sendMessage({
    act: "opened",
  });

  dlButton.click(() => {
    let input = urlInput.val();
  });
});
