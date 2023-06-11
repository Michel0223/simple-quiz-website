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
        case "register":
                location.pathname='/register'
            break;
    }
})