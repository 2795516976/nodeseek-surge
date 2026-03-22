const cookie = $persistentStore.read("nodeseek_cookie");

if (!cookie) {
  $notification.post("NodeSeek", "签到失败", "没有Cookie，先打开一次网站");
  $done();
}

const url = "https://www.nodeseek.com/api/attendance?random=true";

const headers = {
  "Cookie": cookie,
  "User-Agent": "Mozilla/5.0"
};

$httpClient.get({ url, headers }, function (error, response, data) {

  if (error) {
    $notification.post("NodeSeek", "签到失败", error);
  } else {
    try {
      const obj = JSON.parse(data);

      if (obj && obj.success) {
        $notification.post("NodeSeek", "签到成功", JSON.stringify(obj));
      } else {
        $notification.post("NodeSeek", "签到结果", data);
      }

    } catch (e) {
      $notification.post("NodeSeek", "可能被风控", data);
    }
  }

  $done();
});