const buildHTML = (XHR) => {
  // HTMLを生成する処理をまとめる
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
    //HTML出力の結果をまとめた変数htmlを返却
    return html;
};

function post (){
  //リクエストを送信する処理をかく
  const submit = window.document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        //通信に失敗した時に発動
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      //挿入HTMLの引数には、関数buildHTMLの返り値を渡す
      list.insertAdjacentHTML('afterend', buildHTML(XHR));
      formText.value = "";
    };
  });
}

window.addEventListener('load', post);