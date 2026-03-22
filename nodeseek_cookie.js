if ($request && $request.headers) {
  const cookie = $request.headers['Cookie'] || $request.headers['cookie'];

  if (cookie) {
    $persistentStore.write(cookie, "nodeseek_cookie");
    $notification.post("NodeSeek", "Cookie获取成功", "已自动更新");
  }
}

$done({});