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