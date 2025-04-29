import { API_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  loadPostForEdit();
  document.getElementById("editForm").addEventListener("submit", updatePost);
});

// URL에서 id 가져오기
function getPostId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// 기존 글 내용 불러오기
async function loadPostForEdit() {
  const postId = getPostId();

  const res = await fetch(`${API_URL}/api/board/${postId}`, {
    method: "GET",
    credentials: "include",
  });
  const post = await res.json();

  document.getElementById("title").value = post.title;
  document.getElementById("content").value = post.content;
}

// 수정 완료 요청 보내기
async function updatePost(e) {
  e.preventDefault();
  const postId = getPostId();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const res = await fetch(`${API_URL}/api/board/update/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();
  alert(data.message);

  // 수정 후 목록 페이지로 이동
  location.href = "board_list.html";
}
