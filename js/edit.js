import { API_URL } from "./config.js";
const params = new URLSearchParams(window.location.search);
const userId = params.get("id");
const form = document.querySelector("#edit");

getForm();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendForm();
});

// 서버에서 특정 사용자 정보를 가져와서 폼 요소에 담아주는 함수
async function getForm() {
  //url 쿼리를 통해 넘어온 사용자 id로 해당 유저 데이터 가져온뒤 구조분해할당으로 값 추출
  const data = await fetch(`${API_URL}/api/admin/edit/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  const json = await data.json();
  const { id, uname, email, colors } = json;

  //수정 폼 요소에 추출한 값을 각각 입력
  document.querySelector("input[name='id']").value = id;
  document.querySelector("input[name='uname']").value = uname;
  document.querySelector("input[name='email']").value = email;

  //colors 값과 매칭되는 라디오요소가 있으면 체크
  const radioEl = document.querySelector(
    `input[type='radio'][value='${colors}']`
  );
  if (radioEl) radioEl.checked = true;
}

async function sendForm() {
  // 수정 이벤트가 발생하는 순간의 폼요소 선택
  const idEl = document.querySelector("input[name='id']");
  const uname = document.querySelector("input[name='uname']");
  const email = document.querySelector("input[name='email']");
  const colors = document.querySelector("input[name='colors']");

  //폼의 value값을 entity구조와 동일한 형태로 묶은뒤 서버 전송을 위해 문자화
  const userInfo = {
    id: idEl.value,
    uname: uname.value,
    email: email.value,
    colors: colors.value,
  };
  const strJson = JSON.stringify(userInfo);

  //PUT 방식으로 요청을 보내 DB데이터 수정
  const data = await fetch(`${API_URL}/api/admin/update`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: strJson,
    credentials: "include",
  });
  console.log(data);

  const result = await data.json();
  alert(result.message);
  location.href = "index.html";
}
