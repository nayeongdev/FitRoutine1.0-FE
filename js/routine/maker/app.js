BASE_URL = "http://127.0.0.1:8000/maker"

function routineCreate(data) {
  const token = JSON.parse(localStorage.getItem("tokens")).access;

  fetch(`${BASE_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
    redirect: 'follow'
  })
    .then(response => response.json())
    .then(data => {
      let content = data;
      localStorage.setItem("result", JSON.stringify(content));

      location.href = "./result.html";
    });
}

const backButton = $('#back-btn');
const nextButton = $('#next-btn');
const prevButton = $('#prev-btn');
const submitButton = $('#submit-btn');

backButton.addEventListener('click', function (e) {
  e.preventDefault();
  window.history.back();
});

nextButton.addEventListener('click', function (e) {
  e.preventDefault();
  userCheck.style.display = 'none';
  userCheckMore.style.display = 'block';
});

prevButton.addEventListener('click', function (e) {
  e.preventDefault();
  userCheck.style.display = 'block';
  userCheckMore.style.display = 'none';
});

submitButton.addEventListener('click', function (e) {
  e.preventDefault();
  const goal = $('#user-goal').value;
  const level = $('#user-level').value;
  const place = $('#user-place').value;
  const preferredActivity = $('input[name ="user-preferred-activity"]:checked').value;
  const exerciseTime = $('#user-exercise-time').value;

  const userData = {};

  userData.goal = goal;
  userData.level = level;
  userData.exercise_place = place;
  userData.preferred_exercise = preferredActivity;
  userData.exercise_duration = exerciseTime;

  routineCreate(userData);
});