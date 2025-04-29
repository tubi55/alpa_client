import { API_URL } from "./config.js";
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", requestLogin);

async function requestLogin(e) {
  e.preventDefault();
  //폼에 입력한 로그인 정보를 아래 패턴의 구문을 통해 바로 DTO형식으로 반한받음
  const formData = new FormData(e.target);
  const loginDTO = Object.fromEntries(formData.entries());

  //DTO형식의 폼정보를 문자화해서 Post 요청 서버에 전달
  const res = await fetch(`${API_URL}/api/login`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(loginDTO),
    credentials: "include",
  });
  const result = await res.json();
  console.log(result);

  //요청이 완료된 JSON객체의 문자값에 "성공"이란 문구가 포함되어 있으면 어드민 페이지 이동
  if (result.isLogin) {
    window.alert("로그인 되었습니다.");
    window.location.href = "admin.html";
  } else {
    window.alert("해당 정보의 사용자가 없습니다.");
  }
}
