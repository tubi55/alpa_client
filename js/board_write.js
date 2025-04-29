import { API_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("postForm").addEventListener("submit", createPost);
});

// 게시글 작성
async function createPost(e) {
  e.preventDefault();
  const title = document.querySelector("input[name='title']").value;
  const content = document.querySelector("textarea[name='content']").value;

  const res = await fetch(`${API_URL}/api/board/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();
  if (data.message === "게시글 작성 성공") {
    alert("등록 완료!");
    location.href = "board_list.html"; // 등록 후 목록 페이지로 이동
  } else {
    alert(data.message || "등록 실패");
  }
}
