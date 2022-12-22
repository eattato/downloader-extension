let downloadDatas = [];

// popup.js와 통신
chrome.runtime.onMessage.addListener((msg) => {
  // console.log(msg);
  if (msg.act == "opened") {
    // 팝업 오픈 시 현재 다운로드 데이터 전송
    chrome.runtime.sendMessage({
      act: "data",
      param: downloadDatas,
    });
  }
});

// 다운로드 시작 시
chrome.downloads.onCreated.addListener((rawItem) => {
  let id = rawItem.id;

  // 조회해야 정확한 값이 나옴!
  chrome.downloads.search({ id: id }).then((items) => {
    let item = items[0];
    let directory = item.finalUrl.split("/");
    let data = {
      name: directory[directory.length - 1],
      path: directory.join("/"),
      icon: "",
      progress: [],
    };
    chrome.downloads.getFileIcon(id).then((icon) => {
      console.log(icon);
    });

    let splitCount = 6;
    let totalSize = item.fileSize;
    for (let ind = 1; ind <= 6; ind++) {
      let progressData = {
        current: 0,
        max: totalSize / splitCount,
      };
      data.progress.push(progressData);
    }
    downloadDatas.push(data);
    console.log("downloading " + item.finalUrl);

    chrome.runtime.sendMessage({
      act: "data",
      param: downloadDatas,
    });
  });
});

chrome.downloads.onChanged.addListener((rawItem) => {
  let id = rawItem.id;
  // console.log(rawItem);
});
