import { API_URL } from "./config.js";
checkLogin();

const btnLogout = document.querySelector(".btnOut");
btnLogout.addEventListener("click", requestLogout);

async function requestLogout(e) {
  e.preventDefault();
  const res = await fetch(`${API_URL}/api/logout`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  window.alert("로그아웃되었습니다.");
  window.location.href = "login.html";
}

//해당 요청은 다시 DB탐색 요청이 아닌 이미 담겨있는 세션의 값 확인 요청
async function checkLogin() {
  const res = await fetch(`${API_URL}/api/check`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  console.log(result);

  if (result.isLogin) {
    document.querySelector(".logged-out").style.display = "none";
    document.querySelector(".logged-in").style.display = "flex";
    document.querySelectorAll(
      "li"
    )[3].innerText = `${result.uname}님 반갑습니다.`;
  } else {
    document.querySelector(".logged-out").style.display = "flex";
    document.querySelector(".logged-in").style.display = "none";
  }

  return result;
}
