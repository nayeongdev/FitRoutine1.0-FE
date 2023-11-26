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

const userData = {};

function App() {
  $('#personal-info-btn').addEventListener('click', e => {
    e.preventDefault();
    const goal = $('#user-goal');
    const age = $('#user-age');
    const gender = $('input[name ="user-gender"]:checked');
    const height = $('#user-height');
    const weight = $('#user-weight');

    userData.goal = goal.value;
    userData.age = age.value + "살";
    userData.gender = gender.value;
    userData.height = height.value + "cm";
    userData.weight = weight.value + "kg";

    localStorage.setItem("user", JSON.stringify(userData));

    location.href = './checkMore.html';
  });

  $('.prev-btn').addEventListener('click', () => {
    history.back();
  });
}

App();