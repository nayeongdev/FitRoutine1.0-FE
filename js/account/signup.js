BASE_URL = "http://127.0.0.1:8000/accounts"

//확인 알럿
function okAlert(msg) {
  Swal.fire(msg)
}

// 로그인 정보를 받아 서버로 전송하여 JWT를 받아오는 함수
async function signupUser(signupData) {
  console.log(JSON.stringify(signupData));
  try {
    const response = await fetch(`${BASE_URL}/join/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData)
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Signup error:', error.message);
    return null;
  }
}

// 회원가입 버튼 클릭 이벤트 핸들러
document.getElementById('signupBtn').addEventListener('click', async (e) => {
  e.preventDefault();

  const signupData = {
    email: $("#userEmail").value,
    username: $("#username").value,
    password: $("#userPwd").value,
    password2: $("#userPwd2").value,
    date_of_birth: $("#userBirthday").value === '' ? null : $("#userBirthday").value,
    height: $("#userHeight").value === '' ? null : $("#userHeight").value,
    weight: $("#userWeight").value === '' ? null : $("#userWeight").value,
    gender: $('input[name ="user-preferred-activity"]:checked')
  }

  const data = await signupUser(signupData);

  if (data) {
    console.log('회원가입 성공');
    window.location.replace(`http://127.0.0.1:5500/templates/account/login.html`)
  } else {
    console.log('회원가입 실패');
    alertMsg = '회원가입 실패. 다시 확인해주세요.';
    okAlert(alertMsg);
  }
});