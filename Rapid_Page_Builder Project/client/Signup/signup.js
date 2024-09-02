let formId = document.getElementById('form');

formId.addEventListener('submit', function (event) {
    console.log('Submiting')
    event.preventDefault();
    console.log({
        Email:document.getElementById('email').value,
        Password:document.getElementById('password').value,
        username: document.getElementById('username').value
    })
    if (validateInputs()) {
        fetch('http://localhost:5000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:document.getElementById('email').value,
                password:document.getElementById('password').value,
                username: document.getElementById('username').value
            })
        }).then((response)=>{
            console.log(response)
            if(response.status !== 200){
                alert('User already exists');
                window.location.reload();
            } else{
            alert('User Registered')
            window.sessionStorage.setItem('user', document.getElementById('email').value)
            window.location.replace('http://127.0.0.1:5500/client/Landing-Page/landingPage-1.html')
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
});

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const emailError = document.getElementById('emailError');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    let isValid = true;

    if (username === '') {
        usernameError.textContent = 'Enter your username!';
        isValid = false;
    } else {
        function logout() {
        window.sessionStorage.setItem('user', null);
        window.location.replace('http://127.0.0.1:5500/client/Login/login.html');
    }
        usernameError.textContent = '';
    }

    if (email.trim() === '') {
        emailError.textContent = 'Enter your email!'
        isValid = false;
    } else if (!isValidEmail(email)) {
        emailError.textContent = 'Enter valid email'
        isValid = false;
    }
    else {
        emailError.textContent = '';
    }

    if (password.trim() === '') {
        passwordError.textContent = 'Enter your password'
        isValid = false;
    } else if (password.trim().length < 8) {
        passwordError.textContent = 'Enter valid password'
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    return isValid;
};

const login = document.getElementById('login')
login.addEventListener('click',function(){
        window.location.replace('http://127.0.0.1:5500/client/Login/login.html');
})
