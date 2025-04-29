import { API_URL } from "./config.js";
createUserList();

//DB 데이터를 기반 동적 목록 생성 함수
async function createUserList(pageNum = 0) {
  const section = document.querySelector("section");
  const res = await fetch(`${API_URL}/api/admin?page=${pageNum}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();

  // console.log(data);

  const userArr = data.users;
  let tags = "";

  if (Array.isArray(userArr) && userArr.length > 0) {
    userArr.forEach((user) => {
      tags += `
      <article>
        <h3>${user.uname}</h3>
        <p>${user.email}</p>
        <span>${user.colors}</span>       
        <button class='btnDel' data-id=${user.id}>delete</button>
        <a href="edit.html?id=${user.id}">edit</a>
      </article>
    `;
    });
  } else {
    // users가 없거나 빈배열일 경우 메시지 표시
    tags = "<p>등록된 회원이 없습니다.</p>";
  }
  //수정 버튼은 수정 전용 페이지에서 글 고유 번호를 받아야 되므로
  //edit_form.html?id=회원아이디 식으로 링크 설정
  section.innerHTML = tags;

  const btnDel = document.querySelectorAll(".btnDel");
  bindingDelEvent(btnDel);

  setPageBtn(data);
}

//동적 생성된 삭제 버튼 요소에 이벤트 바인딩 함수
function bindingDelEvent(btns) {
  btns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const memberId = e.currentTarget.getAttribute("data-id");
      console.log(memberId);

      const data = await fetch(`${API_URL}/api/admin/del/${memberId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await data.json();
      alert(result.message);
      location.href = "index.html";
    });
  });
}

function setPageBtn(data) {
  const pagination = document.querySelector("#pagination");
  pagination.innerHTML = ""; // 이전 버튼들 초기화

  const { currentPage, totalPages } = data;

  // 이전 버튼
  if (currentPage > 0) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "이전";
    prevBtn.addEventListener("click", () => createUserList(currentPage - 1));
    pagination.appendChild(prevBtn);
  }

  // 페이지 번호 버튼
  for (let i = 0; i < totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i + 1;
    if (i === currentPage) pageBtn.disabled = true; // 현재 페이지 비활성화
    pageBtn.addEventListener("click", () => createUserList(i));
    pagination.appendChild(pageBtn);
  }

  // 다음 버튼
  if (currentPage < totalPages - 1) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "다음";
    nextBtn.addEventListener("click", () => createUserList(currentPage + 1));
    pagination.appendChild(nextBtn);
  }
}
