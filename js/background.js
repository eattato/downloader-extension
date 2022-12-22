let downloadDatas = [];

// popup.js와 통신
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.act == "opened") {
    // 팝업 오픈 시 현재 다운로드 데이터 전송
    chrome.runtime.sendMessage({
      act: "data",
      param: downloadDatas,
    });
  }
});

// 다운로드 시작 시
chrome.downloads.onCreated.addListener((item) => {
  let data = {
    name: item.filename,
    path: item.finalUrl,
    progress: [],
  };

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
  console.log(item.filename + " is downloading from " + item.finalUrl);

  chrome.runtime.sendMessage({
    act: "data",
    param: downloadDatas,
  });
});
