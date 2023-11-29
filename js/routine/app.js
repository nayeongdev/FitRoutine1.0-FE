window.onload = function () {
  routineList()
}

BASE_URL = "http://127.0.0.1:8000/routines"

// 루틴 레더링
function renderRoutine(routines) {
  console.log(routines);
  const routineList = $('.routine-list');

  routines.forEach(routine => {
    const listElement = document.createElement('li');
    listElement.classList.add('col-8-container');
    
    const anchorElement = document.createElement('a');
    anchorElement.href = `./routineDetail.html?id=${routine.id}`;
    anchorElement.addEventListener('click', function () {
      routineDetail(routine.id);
    });
    
    const originalDate = new Date(routine.created_at);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(originalDate);

    const titleElement = document.createElement('h3');
    titleElement.classList.add('ta-l');
    titleElement.textContent = routine.title;

    const contentElement = document.createElement('p');
    contentElement.classList.add('ta-l');
    contentElement.textContent = formattedDate;

    anchorElement.appendChild(titleElement)
    anchorElement.appendChild(contentElement)

    listElement.appendChild(anchorElement);
    routineList.appendChild(listElement);
  });
}

// 루틴 리스트
function routineList() {
  const token = JSON.parse(localStorage.getItem("tokens")).access;
  fetch(`${BASE_URL}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Received data:', data);
      renderRoutine(data)
    })
    .catch(error => {
      console.error('Error getting routine:', error);
    });
}