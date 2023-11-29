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

const today = new Date();
const formattedDate = today.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
const title = `${formattedDate} 루틴`;

let content = JSON.parse(localStorage.getItem("result")).chat_gpt_response;
$('.answer').innerHTML = `<pre>${content}</pre>`;


BASE_URL = "http://127.0.0.1:8000"

const saveBtn = $('#routine-save-btn');

saveBtn.addEventListener('click', () => {
  const token = JSON.parse(localStorage.getItem("tokens")).access;

  fetch(`${BASE_URL}/maker/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const exerciserId = data[data.length - 1].id;
      return fetch(`${BASE_URL}/routines/?exerciser_id=${exerciserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content }),
        redirect: 'follow'
      })
    })
    .then(response => response.json())
    .then(data => {
      checkedAlert(data.msg);
      setTimeout(() => location.href = "../index.html", 1500);
    }).catch(error => {
      console.error('Error posting routine:', error);
      alertMsg = '내용을 저장하지 못했어요😱';
      okAlert(alertMsg);
    });
})
