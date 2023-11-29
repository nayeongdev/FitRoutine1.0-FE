BASE_URL = "http://127.0.0.1:8000/routines"

//확인 알럿
function okAlert(msg) {
  Swal.fire(msg)
}

// 완료 알럿
function checkedAlert(msg) {
  Swal.fire({
    // position: 'top-end',
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 1500
  })
}

// 루틴 수정
function routineEdit(routineId) {
  let title = document.getElementById('routine_title').value;
  let content = document.getElementById('routine_content').value;

  let alertMsg = "";
  if (title.length === 0) {
    alertMsg = '루틴 제목을 입력해 주세요!';
    okAlert(alertMsg);
    return;
  }
  if (content.length === 0) {
    alertMsg = '루틴 내용을 입력해 주세요!';
    okAlert(alertMsg);
    return;
  }

  const token = JSON.parse(localStorage.getItem("tokens")).access;
  fetch(`${BASE_URL}/${routineId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  })
    .then(response => response.json())
    .then(data => {
      checkedAlert(data.msg);
      setTimeout(() => window.location.reload(), 1500);
      window.location.replace(`http://127.0.0.1:5500/templates/routine/index.html`)
    })
    .catch(error => {
      console.error('Error modifying routine:', error);
      alertMsg = '내용을 수정하지 못했어요😱';
      okAlert(alertMsg);
    });
}