import { API_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
});

// 게시글 목록 로드
async function loadPosts() {
  const res = await fetch(`${API_URL}/api/board/list`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();

  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  // 현재 로그인한 사용자 이름 가져오기
  const loginUserRes = await fetch(`${API_URL}/api/board/loginUser`, {
    method: "GET",
    credentials: "include",
  });
  const loginUserData = await loginUserRes.json();
  const loginUserName = loginUserData.username;

  data.forEach((post) => {
    const article = document.createElement("article");
    article.style.border = "1px solid #ccc";
    article.style.padding = "10px";
    article.style.margin = "10px 0";

    article.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <p><strong>작성자:</strong> ${post.writerName}</p>
      <small>글 번호: ${post.id}</small>
    `;

    // 작성자가 본인일 경우만 삭제 버튼 추가
    if (post.writerName === loginUserName) {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.addEventListener("click", () => {
        deletePost(post.id);
      });
      article.appendChild(deleteBtn);
    }

    // 작성자가 본인일 경우만 수정 버튼 추가
    if (post.writerName === loginUserName) {
      const editBtn = document.createElement("a");
      editBtn.textContent = "수정";
      editBtn.style.marginLeft = "10px";
      editBtn.setAttribute("href", `board_edit.html?id=${post.id}`);
      article.appendChild(editBtn);
    }

    postList.appendChild(article);
  });
}

// 게시글 삭제 함수
async function deletePost(postId) {
  if (!confirm("정말로 삭제하시겠습니까?")) {
    return;
  }

  const res = await fetch(`${API_URL}/api/board/delete/${postId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();
  alert(data.message);

  // 삭제 후 목록 새로고침
  loadPosts();
}
