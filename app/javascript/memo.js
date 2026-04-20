/**
 * リクエストを送信するためのメイン関数
 * ページが読み込まれた時に、フォームの送信準備を整える役割を持ちます。
 */
function post() {
  // HTMLの中から、idが"form"となっている要素（投稿フォーム）を取得して変数に入れます。
  const form = document.getElementById("form");
  
  // もしページ内にフォームが存在しない場合にエラーが出るのを防ぐため、念のためチェック
  // if (!form) return;

  /**
   * フォームの「送信ボタン」が押された時の動作を予約します（イベントリスナー）。
   * (e) は発生したイベントそのものを指します。
   */
  form.addEventListener("submit", (e) => {
    
    // 1. ブラウザが本来持っている「ページを丸ごとリロードして送信する」という標準動作をキャンセルします。
    // これにより、画面が白くならずに裏側で通信できるようになります。
    e.preventDefault();

    // 2. フォームに入力されたデータ（テキストなど）を、JavaScriptで扱える形式にまとめて取得します。
    const formData = new FormData(form);

    // 3. 通信を行うための専用オブジェクト「XMLHttpRequest（XHR）」を生成します。
    const XHR = new XMLHttpRequest();

    // 4. 通信の設定を行います。
    // 第1引数：送信方法（POST）、第2引数：送信先のURL（/posts）、第3引数：非同期で行うか（true）
    XHR.open("POST", "/posts", true);

    // 5. サーバーから返ってくるレスポンス（返事）の形式を「JSON」に指定します。
    // これにより、サーバーからのデータをオブジェクトとして扱いやすくなります。
    XHR.responseType = "json";

    // 6. 実際にデータを送信します。引数に先ほどまとめた formData を渡します。
    XHR.send(formData);
  });
}

/**
 * 画面の読み込み（またはTurboによる切り替え）が終わったら、
 * 上記の post 関数を実行して「送信の準備」を整えるよう指示します。
 */
window.addEventListener('turbo:load', post);