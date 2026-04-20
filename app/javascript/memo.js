/**
 * サーバーから返ってきたデータをもとに、追加するHTMLを作成する関数
 * @param {XMLHttpRequest} XHR - 通信状態やサーバーからのレスポンスを含むオブジェクト
 * @returns {string} 組み立てられたHTML文字列
 */

const buildHTML = (XHR) => {
  // サーバーから返ってきたJSONデータの中から、投稿内容（post）を取り出します
  const item = XHR.response.post;
  
  // ブラウザに表示するためのHTMLを組み立てます。
  // ${} を使うことで、変数の中身（投稿日時や内容）を文字列の中に埋め込むことができます（テンプレートリテラル）。
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  
  // 組み立てたHTMLを呼び出し元に返します
  return html;
};

/**
 * リクエストを送信するためのメイン関数
 */
function post() {
  const form = document.getElementById("form");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);

    /**
     * サーバーから返事が戻ってきた（通信が完了した）時に動く処理
     */
    XHR.onload = () => {
      // 通信が成功したか（ステータスコードが200：成功 か）を確認します
      if (XHR.status != 200) {
        // 失敗した場合はエラーメッセージを表示して処理を中断します
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };

      // 新しい投稿を表示させる場所（親要素）を取得します
      const list = document.getElementById("list");
      
      // 入力フォーム自体を取得します（後で中身を空にするため）
      const formText = document.getElementById("content");

      // list要素の直後（afterend）に、buildHTML関数で作ったHTMLを差し込みます
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      
      // 注意：コード内に「list.insertAdjacentHTML("afterend", html);」が残っていますが、
      // htmlという変数はbuildHTMLの外にはないので、通常はエラーになります。
      // buildHTML(XHR) が実行された時点でHTMLの追加は完了しています。

      // 送信が終わった後、入力欄に残っている文字を消して空にします
      formText.value = "";
    };
  });
}

window.addEventListener('turbo:load', post);