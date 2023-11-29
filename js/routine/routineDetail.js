BASE_URL = "http://127.0.0.1:8000/routines"

// 완료 알럿
function checkedAlert(msg) {
  Swal.fire({
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 1500
  })
}

// '정보' 섹션을 렌더링하는 함수
function rendeInfo(exerciseInfo) {
  const routineInfoElement = document.querySelector('.routine-info');
  const infoHeadings = ['목표', '수준', '장소', '선호 운동', '운동 시간'];

  if (exerciseInfo) {
    for (let i = 0; i < infoHeadings.length; i++) {
      const infoDiv = document.createElement('div');

      const titleElement = document.createElement('h3');
      titleElement.textContent = infoHeadings[i];

      const contentElement = document.createElement('p');
      const propertyName = Object.keys(exerciseInfo)[i];
      contentElement.textContent = exerciseInfo[propertyName];

      // 생성한 요소들을 DOM에 추가합니다.
      infoDiv.appendChild(titleElement);
      infoDiv.appendChild(contentElement);
      routineInfoElement.appendChild(infoDiv);
    }
  } else {
    const routineInfoElement = document.querySelector('.routine-info');
    routineInfoElement.style.display = 'none';
  }

}

function renderDetail(routine) {
  const exerciseInfo = routine.exerciser_info
  rendeInfo(exerciseInfo);
  
  const titleElement = document.getElementById('routine-title');
  const contentElement = document.getElementById('routine-content');

  titleElement.textContent = routine.title;
  contentElement.innerHTML = routine.content;

  // 삭제 버튼 이벤트 핸들러
  const deleteButton = document.querySelector('.delete-btn a');
  deleteButton.onclick = function () {
    routineDelete(routine.id);
    return false;
  };

  // 수정 버튼 이벤트 핸들러
  const editButton = document.querySelector('.edit-btn a');
  editButton.href = `./routineForm.html?id=${routine.id}`;

}

// 루틴 상세
function routineDetail(routineId) {
  const token = JSON.parse(localStorage.getItem("tokens")).access;
  fetch(`${BASE_URL}/${routineId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Received data:', data);
      renderDetail(data)
    })
    .catch(error => {
      console.error('Error getting routine:', error);
    });
}

// 루틴 삭제
function routineDelete(routineId) {
  Swal.fire({
    title: '정말 삭제 하시겠습니까?',
    text: "삭제하면 복구할 수 없습니다",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#BA1A1A',
    cancelButtonColor: '#D9D9D9',
    confirmButtonText: '삭제',
    cancelButtonText: '취소'
  }).then((result) => {
    if (result.isConfirmed) {
      const token = JSON.parse(localStorage.getItem("tokens")).access;

      fetch(`${BASE_URL}/${routineId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(response => response.json())
        .then(data => {
          checkedAlert(data.msg);
          setTimeout(() => window.location.reload(), 1500);
        })
        .catch(error => {
          console.error('Error deleting routine:', error);
        });
    }
  })
}

window.addEventListener('DOMContentLoaded', function () {
  const url = window.location.href;
  const params = new URL(url).searchParams;
  const id = params.get('id');
  routineDetail(id);
});