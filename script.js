window.addEventListener(('click'),(e)=>{
    switch(e.target.id) {
        case "login":
                location.pathname='/login';
            break;
        case "loginButton":
            const nameInput = document.getElementById('userName');
            const passInput = document.getElementById('userPassword');
            const loginData = { Username: nameInput.value, Password: passInput.value };
                fetch('/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(loginData)
                })
                .then(response => response.text())
                .catch(error => {
                    console.error('Error:', error);
                });
            break;
        case "registerButton":
            const registerNameInput = document.getElementById('userName');
            const registerPassInput = document.getElementById('userPassword');
            const registerPassRepeatInput = document.getElementById('userPasswordRepeat')
            const registerData = { Username: registerNameInput.value, Password: registerPassInput.value, repeatPassword: registerPassRepeatInput.value };
                fetch('/register', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(registerData)
                })
                .then(response => response.text())
                .catch(error => {
                    console.error('Error:', error);
                });
            break;
        case "userName":
            const usernameInput = document.getElementById('userName');
                usernameInput.addEventListener('input', (event)=>{
                });
            break;
        case "userPassword":
            const passwordInput = document.getElementById('userName');
                passwordInput.addEventListener('input', (event)=>{
                });
            break;
        case "userPasswordRepeat":
            const repeatPasswordInput = document.getElementById('userPasswordRepeat')
                repeatPasswordInput.addEventListener('input',(event)=>{
                });
            break;
        case "register":
                location.pathname='/register'
            break;
    }
})