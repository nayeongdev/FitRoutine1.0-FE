const $ = (selector) => document.querySelector(selector);

// 메뉴 버튼
//열기
$(".menu-open-btn").addEventListener('click', () => {
  document.body.classList.add("non-scroll");
  $(".gnb").classList.add("opened");
  $(".menu-close-btn").classList.add("opened");
  $("#backdrop").style.display = 'block';
  document.body.classList.add("non-scroll");
});
//닫기
$('.menu-close-btn').addEventListener('click', () => {
  $("#backdrop").style.display = 'none';
  $(".gnb").classList.remove("opened");
  $(".menu-close-btn").classList.remove("opened");
  document.body.classList.remove("non-scroll");
});

let content = JSON.parse(localStorage.getItem("result")).chat_gpt_response;

$('.answer').innerHTML = `<pre>${content}</pre>`;

const goChatBtn = $('#go-chat-btn');

goChatBtn.addEventListener('click', () => {
  location.href = '../chat.html';
})

function logoutUser() {
  try {
    localStorage.removeItem('tokens');
    location.reload()
  } catch (error) {
    console.error('Logout error:', error.message);
  }
}

function updateUI() {
  const hasTokens = localStorage.getItem('tokens');
  if (hasTokens) {
    document.getElementById('logged-in').style.display = 'block';
    document.getElementById('logged-out').style.display = 'none';
  } else {
    document.getElementById('logged-in').style.display = 'none';
    document.getElementById('logged-out').style.display = 'block';
  }
}

// 페이지 로드 시 UI 업데이트
window.addEventListener('DOMContentLoaded', function () {
  updateUI();
});