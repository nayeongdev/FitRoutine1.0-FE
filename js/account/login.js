BASE_URL = "http://127.0.0.1:8000/accounts"

//확인 알럿
function okAlert(msg) {
  Swal.fire(msg)
}

// 로그인 정보를 받아 서버로 전송하여 JWT를 받아오는 함수
async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    // 받은 JWT를 브라우저 로컬 스토리지에 저장하여 로그인 상태를 유지
    localStorage.setItem('tokens', JSON.stringify(data.tokens));

    return data.tokens;
  } catch (error) {
    console.error('Login error:', error.message);
    return null;
  }
}

// 로그인 버튼 클릭 이벤트 핸들러
document.getElementById('loginBtn').addEventListener('click', async (e) => {
  e.preventDefault();

  const email = $('#email').value;
  const password = $('#password').value;

  const tokens = await loginUser(email, password);

  if (tokens) {
    // 로그인 성공 시 원하는 동작 수행
    console.log('로그인 성공');
    window.location.replace(`http://127.0.0.1:5500/templates/index.html`)
  } else {
    // 로그인 실패 시 처리
    console.log('로그인 실패');
    alertMsg = '로그인 실패. 다시 입력하세요.';
    okAlert(alertMsg);
  }
});